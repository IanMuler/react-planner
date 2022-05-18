/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Todos } from "./style";
import TodoItem from "./TodoItem";
import { addTime } from "../../utils/addTime";

const TodoList = ({ tasks, setTasks, wakeUpTime }) => {
  useEffect(() => {
    if (tasks.some((task) => !task.start)) {
      setTasks(
        tasks.map((task, index) => {
          return {
            ...task,
            start: tasks
              .slice(0, index)
              .reduce(
                (acumulator, task) => addTime(acumulator, task.duration),
                wakeUpTime
              ),
          };
        })
      );
    }
  }, [tasks, wakeUpTime]);

  return (
    <Droppable droppableId="tasksTodo">
      {(droppableProvided) => (
        <Todos
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          {tasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.draggableId}
              index={index}
            >
              {(draggableProvided) => (
                <div
                  {...draggableProvided.draggableProps}
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.dragHandleProps}
                >
                  <TodoItem task={task}>
                    {draggableProvided.placeholder}
                  </TodoItem>
                </div>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </Todos>
      )}
    </Droppable>
  );
};

export default TodoList;
