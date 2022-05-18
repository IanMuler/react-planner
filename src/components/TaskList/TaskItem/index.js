import React from "react";
import { Item, Duration, Text, Options, EditIcon, DeleteIcon } from "./style";

const TaskItem = ({ children, task, openEditForm, deleteTask }) => {
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
              openEditForm(task.id);
            }}
          />
          <DeleteIcon
            onClick={() => {
              deleteTask(task.id);
            }}
          />
        </Options>
      )}
      {!hover && <Duration>{task.duration.slice(1)}</Duration>}
      {children}
    </Item>
  );
};

export default TaskItem;
