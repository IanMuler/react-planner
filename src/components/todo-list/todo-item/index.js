import React, { useEffect } from "react";
import { Item, Start, Text, Duration } from "./style";
import { refreshToDo } from "../../../utils/todo";
import { Context } from "../../../context/state";

const TodoItem = ({ children, task, isDragging }) => {
  const { isDraggingTodo } = React.useContext(Context);
  const itemRef = React.createRef();

  useEffect(() => {
    isDraggingTodo.update(isDragging);
  }, [isDragging]);

  //When wake up time is like "07:00" it will be converted to "7:00"
  const start =
    task.start?.startsWith("0") && task.start?.length === 5
      ? task.start.slice(1)
      : task.start;

  const { text, duration } = task;

  return (
    <Item ref={itemRef} isDragging={isDragging}>
      <Start>{start}</Start>
      <Text>{text}</Text>
      <Duration>{duration.slice(1)}</Duration>
      {children}
    </Item>
  );
};

export default TodoItem;
