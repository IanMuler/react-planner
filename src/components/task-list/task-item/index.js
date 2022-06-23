import React from "react";
import { Item, Duration, Text, Options, EditIcon, DeleteIcon } from "./style";

const TaskItem = ({ children, task, openForm, deleteTask }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Item
      assigned={task.assigned}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Text>{task.text}</Text>
      {hover && (
        <Options>
          <EditIcon
            onClick={() => {
              openForm(task);
            }}
          />
          <DeleteIcon
            onClick={() => {
              deleteTask(task);
            }}
          />
        </Options>
      )}
      {!hover && (
        <Duration>
          {task.duration !== "00:00" ? task.duration.slice(1) : null}
        </Duration>
      )}
      {children}
    </Item>
  );
};

export default TaskItem;
