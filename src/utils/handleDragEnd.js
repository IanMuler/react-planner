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
  const { destination, source } = result
  const switchTasks = {
    'general-tasks': {
      tasks: generalTasks,
      setTasks: setGeneralTasks
    },
    'daily-tasks': {
      tasks: dialyTasks,
      setTasks: setDialyTasks
    },
    'once-tasks': {
      tasks: onceTasks,
      setTasks: setOnceTasks
    }
  }
  if (!destination) {
    return
  }
  if (
    // same place
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return
  }
  if (
    // same list, different order
    destination.droppableId === source.droppableId &&
    destination.index !== source.index
  ) {
    if (source.droppableId !== 'todos') {
      const newTasks = [...switchTasks[source.droppableId].tasks]
      const [removed] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, removed)
      switchTasks[source.droppableId].setTasks(newTasks)
    }
    if (source.droppableId === 'todos') {
      const newTodos = [...todos]
      const [removed] = newTodos.splice(source.index, 1)
      newTodos.splice(destination.index, 0, removed)
      setTodos(newTodos)
    }
  }
  if (
    // tasks lists to todos list
    destination.droppableId !== source.droppableId &&
    destination.droppableId === 'todos'
  ) {
    const newTasks = [...switchTasks[source.droppableId].tasks]
    const [removed] = newTasks.splice(source.index, 1)
    newTasks.splice(source.index, 0, { ...removed, assigned: true })
    const newTodos = [...todos]
    newTodos.splice(destination.index, 0, {
      ...removed,
      id: `${Math.floor(Math.random() * 100000)}`
    })
    switchTasks[source.droppableId].setTasks(newTasks)
    setTodos(newTodos)
  }
  if (
    // todo lists to general tasks
    source.droppableId === 'todos' &&
    destination.droppableId === 'general-tasks'
  ) {
    const newTasks = [...switchTasks[destination.droppableId].tasks]
    const newTodos = [...todos]
    const [removed] = newTodos.splice(source.index, 1)

    const removedTask = newTasks.find((task) => task.text === removed.text)
    if (removedTask) {
      newTasks.splice(newTasks.indexOf(removedTask), 1, removed)
    }

    switchTasks[destination.droppableId].setTasks(newTasks)
    setTodos(newTodos)
  }
}
