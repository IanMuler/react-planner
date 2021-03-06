import { addTime } from "./addTime";

export const refreshToDoList = (context) => {
  const { tasks, todo } = context;
  if (todo.list.length > 0) {
    if (window.confirm("Are you sure you want to refresh the ToDo list?")) {
      Object.keys(tasks.lists).forEach((key) => {
        tasks.lists[key].forEach((task) => {
          task.assigned = false;
        });
      });
      todo.list.forEach((task) => {
        todo.delete(task);
      });
    }
  }
};

export const refreshToDo = (task, context) => {
  const { tasks, todo, isDraggingTodo } = context;
  if (window.confirm("Are you sure you want to remove this task?")) {
    todo.delete(task);
    const onlyExistOne = todo.list.filter((t) => t.id === task.id).length === 1;
    if (onlyExistOne) tasks.update({ ...task, assigned: false });
    isDraggingTodo.update(false);
  }
};

export const addWakeUpTime = (todo, wakeUpTime) => {
  const list = todo.list;

  if (
    // false if every task has start time and there is wake up time
    // true if wake up time and first task start time are the same
    (!list.every((task) => task.start) && wakeUpTime) ||
    wakeUpTime !== list[0].start
  ) {
    list.map((task, index) => {
      const start = list
        .slice(0, index)
        .reduce(
          (acumulator, task) => addTime(acumulator, task.duration),
          wakeUpTime
        );
      todo.update({ ...task, start });
    });
  }
};
