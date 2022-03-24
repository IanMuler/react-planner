import React from "react";
import {
  Item,
  ItemDuration,
  ItemText,
  Options,
  EditIcon,
  DeleteIcon,
} from "./style";

const TaskItem = ({ children, task, openEditForm, deleteTask }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Item
      assigned={task.assigned}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ItemText>{task.text}</ItemText>
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
      {children}
    </Item>
  );
};

export default TaskItem;
