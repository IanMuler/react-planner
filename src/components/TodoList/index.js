/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Todos, TodosItem, TodosItemStart, TodosItemDuration } from './style'
import { addTime } from '../../utils/addTime'

const TodoList = ({ todos, wakeUpTime }) => {
  const [todosTimes, setTodosTimes] = React.useState([])

  useEffect(() => {
    setTodosTimes(
      todos.map((todo, index) =>
        todos.slice(0, index)
          .reduce(
            (acumulator, todo) => addTime(acumulator, todo.duration),
            wakeUpTime
          )
      )
    )
  }, [todos, wakeUpTime])

  return (
        <Droppable droppableId="todos">
            {(droppableProvided) => (
                <Todos
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                >
                    {todos.map((todo, index) => (
                        <Draggable
                            key={todo.id}
                            draggableId={todo.id}
                            index={index}
                        >
                            {(draggableProvided) => (
                                <TodosItem
                                    {...draggableProvided.draggableProps}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                >
                                    <TodosItemStart>{todosTimes[index]}</TodosItemStart>
                                    {todo.text}
                                    <TodosItemDuration>
                                        {todo.duration.slice(1)}
                                    </TodosItemDuration>
                                    {draggableProvided.placeholder}
                                </TodosItem>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                </Todos>
            )}
        </Droppable>
  )
}

export default TodoList
