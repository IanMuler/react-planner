import React from "react";
import { Item, ItemDuration, Options, EditIcon, DeleteIcon } from "./style";

const TaskItem = ({ children, task, openEditForm, deleteTask }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Item
      assigned={task.assigned}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
      {!hover && <ItemDuration>{task.duration.slice(1)}</ItemDuration>}
      {task.text}
      {children}
    </Item>
  );
};

export default TaskItem;
