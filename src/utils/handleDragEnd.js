import { v4 } from "uuid";
import { refreshToDo } from "./todo";

export const handleDragEnd = (result, context) => {
  const { destination, source } = result;
  const { todo, tasks, updateState, isDraggingTodo } = context;

  if (!destination) {
    return;
  }

  // same place
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (
    // todo task to delete icon
    source.droppableId === "todo" &&
    destination.droppableId === "delete"
  ) {
    return refreshToDo(todo.list[source.index], context);
  }

  // same list, different order
  if (
    destination.droppableId === source.droppableId &&
    destination.index !== source.index
  ) {
    if (source.droppableId === "todo") {
      const newTasks = [...todo.list];
      const [removed] = newTasks.splice(source.index, 1);
      //start must be null to refresh the start generator function
      newTasks.splice(destination.index, 0, {
        ...removed,
        start: null,
      });
      updateState({ todo: { list: newTasks } });
    }
    if (source.droppableId !== "todo") {
      const newTasks = [...tasks.lists[source.droppableId]];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);
      updateState({
        tasks: {
          ...tasks,
          lists: { ...tasks.lists, [source.droppableId]: newTasks },
        },
      });
    }
  }

  if (
    // tasks lists to todo list
    source.droppableId !== "todo" &&
    destination.droppableId === "todo"
  ) {
    const newTasks = [...todo.list];
    const task = tasks.lists[source.droppableId][source.index];
    task.once
      ? tasks.delete(task)
      : tasks.update({
          ...task,
          assigned: true,
        });

    const { assigned, once, ...rest } = task;
    newTasks.splice(destination.index, 0, {
      ...rest,
      draggableId: `_${v4()}`,
    });

    updateState({ todo: { list: newTasks } });
  }

  if (
    // todo list to tasks list
    source.droppableId === "todo" &&
    destination.droppableId !== "todo"
  ) {
    const task = todo.list[source.index];
    if (task.category === destination.droppableId) {
      if (destination.droppableId === "once") {
        const { start, ...rest } = task;
        tasks.add({ ...rest, once: true }, destination.droppableId);
      } else {
        const onlyExistOne =
          todo.list.filter((t) => t.id === task.id).length === 1;
        const { start, ...rest } = task;
        if (onlyExistOne) tasks.update({ ...rest, assigned: false });
      }
      todo.delete(task);
      // force isDraggingTodo to false, react-beautiful-dnd for some reason doesnt update isDragging
      isDraggingTodo.update(false);
    } else {
      alert("This task is from another category");
    }
  }
};
