export const handleDragEnd = (result, tasks, setTasks, todos, setTodos) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      if (source.droppableId === "tasks") {
        const newTasks = [...tasks];
        const [removed] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, removed);
        setTasks(newTasks);
      }
      if (source.droppableId === "todos") {
        const newTodos = [...todos];
        const [removed] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, removed);
        setTodos(newTodos);
      }
    }
    if (
      destination.droppableId !== source.droppableId &&
      destination.droppableId === "todos"
    ) {
      const newTasks = [...tasks];
      const [removed] = newTasks.splice(source.index, 1);
      const newTodos = [...todos];
      newTodos.splice(destination.index, 0, removed);
      setTasks(newTasks);
      setTodos(newTodos);
    }
  };