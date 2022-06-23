import React, { useContext, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./task-item";
import { Context } from "../../context/state";
import {
  Tasks,
  CreateTask,
  CreateIcon,
  CreateTaskItem,
  CreateTaskItemDuration,
  ConfirmTask,
  CreateTaskInput,
  Title,
  Header,
} from "./style";

const TaskList = ({ category }) => {
  const [formVisible, setFormVisible] = React.useState(false);

  const initialFormState = {
    text: "",
    duration: "",
  };

  const [taskForm, setTaskForm] = React.useState({ ...initialFormState });
  const { tasks, todo } = useContext(Context);

  const selectOptions = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
  ];

  const openForm = (task) => {
    setFormVisible(true);
    if (task) {
      setTaskForm({ ...task });
    } else {
      setTaskForm({ ...initialFormState });
    }
  };

  const handleDelete = (task) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      tasks.delete(task);
      if (task.assigned) todo.delete(task);
    }
  };

  const handlePress = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (taskForm.text && taskForm.duration) {
        if (taskForm.id) {
          tasks.update(taskForm);
          todo.update(taskForm);
        } else {
          const taskAlreadyExists = tasks.lists[category].some(
            (task) => task.text === taskForm.text
          );
          if (taskAlreadyExists) {
            alert("Task already exists in this category");
          } else {
            tasks.add(taskForm, category);
          }
        }
        setFormVisible(false);
        setTaskForm({ ...initialFormState });
      } else {
        if (!taskForm.text) {
          alert("Please enter a task name");
        } else {
          alert("Please enter a task duration");
        }
      }
    }
  };

  return (
    <Droppable droppableId={category}>
      {(droppableProvided) => (
        <Tasks
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          <Header>
            <Title>
              {/* first letter capitalized */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Title>
            <CreateTask
              onClick={() => {
                !formVisible ? openForm() : setFormVisible(false);
              }}
            >
              <CreateIcon />
            </CreateTask>
          </Header>

          {formVisible && (
            <CreateTaskItem onKeyPress={handlePress}>
              <CreateTaskInput
                value={taskForm.text}
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Write a task"
                onChange={(e) => {
                  setTaskForm({ ...taskForm, text: e.target.value });
                }}
              />
              <CreateTaskItemDuration
                value={taskForm.duration}
                onChange={(e) => {
                  setTaskForm({ ...taskForm, duration: e.target.value });
                }}
              >
                {selectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </CreateTaskItemDuration>
              <ConfirmTask onClick={handlePress} />
            </CreateTaskItem>
          )}
          {tasks.lists[category].map((task, index) => (
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
                  <TaskItem
                    task={task}
                    openForm={openForm}
                    deleteTask={handleDelete}
                  >
                    {draggableProvided.placeholder}
                  </TaskItem>
                </div>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </Tasks>
      )}
    </Droppable>
  );
};

export default TaskList;
