import React from "react";
import { Item, Start, Text, Duration } from "./style";

const TodoItem = ({ children, task }) => {
  return (
    <Item>
      <Start>{task.start}</Start>
      <Text>{task.text}</Text>
      <Duration>{task.duration.slice(1)}</Duration>
      {children}
    </Item>
  );
};

export default TodoItem;
