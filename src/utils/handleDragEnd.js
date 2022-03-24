export const handleDragEnd = (
  result,
  generalTasks,
  setGeneralTasks,
  dialyTasks,
  setDialyTasks,
  onceTasks,
  setOnceTasks,
  todos,
  setTodos
) => {
  const { destination, source } = result;
  const switchTasks = {
    General: {
      tasks: generalTasks,
      setTasks: setGeneralTasks,
    },
    Daily: {
      tasks: dialyTasks,
      setTasks: setDialyTasks,
    },
    Once: {
      tasks: onceTasks,
      setTasks: setOnceTasks,
    },
  };
  if (!destination) {
    return;
  }
  if (
    // same place
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  if (
    // same list, different order
    destination.droppableId === source.droppableId &&
    destination.index !== source.index
  ) {
    if (source.droppableId !== "todos") {
      const newTasks = [...switchTasks[source.droppableId].tasks];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);
      switchTasks[source.droppableId].setTasks(newTasks);
    }
    if (source.droppableId === "todos") {
      const newTodos = [...todos];
      const [removed] = newTodos.splice(source.index, 1);
      newTodos.splice(destination.index, 0, removed);
      setTodos(newTodos);
    }
  }
  if (
    // general and order tasks lists to todos list
    (source.droppableId === "Daily" && destination.droppableId === "todos") ||
    (source.droppableId === "General" && destination.droppableId === "todos")
  ) {
    const newTasks = [...switchTasks[source.droppableId].tasks];
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(source.index, 0, { ...removed, assigned: true });
    const newTodos = [...todos];
    newTodos.splice(destination.index, 0, {
      ...removed,
      draggableId: `${Math.floor(Math.random() * 100000)}`,
    });
    switchTasks[source.droppableId].setTasks(newTasks);
    setTodos(newTodos);
  }
  if (
    // once tasks lists to todos list
    source.droppableId === "Once" &&
    destination.droppableId === "todos"
  ) {
    const newTasks = [...switchTasks[source.droppableId].tasks];
    const [removed] = newTasks.splice(source.index, 1);
    const newTodos = [...todos];
    newTodos.splice(destination.index, 0, {
      ...removed,
      draggableId: `${Math.floor(Math.random() * 100000)}`,
    });
    switchTasks[source.droppableId].setTasks(newTasks);
    setTodos(newTodos);
  }
  if (
    // todo lists to general or daily lists
    (source.droppableId === "todos" && destination.droppableId === "Daily") ||
    (source.droppableId === "todos" && destination.droppableId === "General")
  ) {
    const newTasks = [...switchTasks[destination.droppableId].tasks];
    const newTodos = [...todos];
    if (newTodos[source.index].list === destination.droppableId) {
      const [removed] = newTodos.splice(source.index, 1);
      const removedTask = newTasks.find((task) => task.text === removed.text);
      let assigned = false;
      if (
        newTodos.some(
          (task) => task.text === removed.text && task.list === removed.list
        )
      ) {
        assigned = true;
      }
      newTasks.splice(newTasks.indexOf(removedTask), 1, {
        ...removed,
        assigned,
      });
      switchTasks[destination.droppableId].setTasks(newTasks);
      setTodos(newTodos);
    } else {
      alert("That task is from another list");
    }
  }
  if (
    // todo lists to once lists
    source.droppableId === "todos" &&
    destination.droppableId === "Once"
  ) {
    const newTasks = [...switchTasks[destination.droppableId].tasks];
    const newTodos = [...todos];
    if (newTodos[source.index].list === destination.droppableId) {
      const [removed] = newTodos.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);
      switchTasks[destination.droppableId].setTasks(newTasks);
      setTodos(newTodos);
    } else {
      alert("That task is from another list");
    }
  }
};
