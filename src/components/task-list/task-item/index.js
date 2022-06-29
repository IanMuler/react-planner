import React from "react";
import { Context } from "../../../context/state";
import {
  Item,
  Duration,
  Text,
  Options,
  EditIcon,
  DeleteIcon,
  Container,
} from "./style";

const TaskItem = ({ children, task, openForm, isDragging }) => {
  const [hover, setHover] = React.useState(false);
  const { tasksVisible, tasks, todo, isDraggingTask } =
    React.useContext(Context);

  React.useEffect(() => {
    isDraggingTask.update(isDragging);
  }, [isDragging]);

  const handleDelete = (task) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      tasks.delete(task);
      if (task.assigned) todo.delete(task);
    }
  };

  return (
    <Container>
      {/* Container is important for draggable movement fluidity, 
      to Item cannot be added margin-bottom so padding-bottom will be added here  */}
      <Item
        assigned={task.assigned}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchMove={() => isDragging && tasksVisible.update(false)}
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
                handleDelete(task);
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
    </Container>
  );
};

export default TaskItem;
