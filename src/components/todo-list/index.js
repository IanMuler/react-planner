import React, { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Todos, NoItems } from "./style";
import TodoItem from "./todo-item";
import { Context } from "../../context/state";
import { addStartTime } from "../../utils/todo";

const TodoList = ({ wakeUpTime }) => {
  const { todo } = React.useContext(Context);
  const { list } = todo;

  useEffect(() => {
    if (list.length > 0) addStartTime(todo, wakeUpTime);
  }, [list, wakeUpTime]);

  return (
    <Droppable droppableId="todo">
      {(droppableProvided) => (
        <Todos
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          {list.length > 0 &&
            list.map((task, index) => (
              <Draggable
                key={task.draggableId}
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
          {list.length === 0 && (
            <NoItems>
              <span>Drag tasks here</span>
            </NoItems>
          )}
          {droppableProvided.placeholder}
        </Todos>
      )}
    </Droppable>
  );
};

export default TodoList;
