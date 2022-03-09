import React, { useEffect } from "react";
import {
  Container,
  Header,
  Todos,
  Application,
  TimeWakeUp,
  TodosItem,
  TodosItemDuration,
  TodosItemStart,
  Tasks,
  TaskItem,
  CreateIcon,
  CreateTask,
  CreateTaskItem,
  CreateTaskItemDuration,
  ConfirmTask,
} from "./style.js";
import { addTime } from "./utils/addTime.js";
import { handleDragEnd } from "./utils/handleDragEnd.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = React.useState([
    {
      id: "1",
      text: "Wake up",
      duration: "00:30",
    },
  ]);
  const [tasks, setTasks] = React.useState([]);
  const [todosTimes, setTodosTimes] = React.useState([]);
  const [wakeUpTime, setWakeUpTime] = React.useState("");

  const [isCreatingTask, setIsCreatingTask] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [taskDuration, setTaskDuration] = React.useState("00:30");

  useEffect(() => {
    setWakeUpTime(localStorage.getItem("wakeUpTime") || "09:00");
    setTodos(JSON.parse(localStorage.getItem("todos")) || todos);
    setTasks(JSON.parse(localStorage.getItem("tasks")) || tasks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTodosTimes(
      todos.map((todo, index) =>
        todos
          .slice(0, index)
          .reduce(
            (acumulator, todo) => addTime(acumulator, todo.duration),
            wakeUpTime
          )
      )
    );
  }, [todos, wakeUpTime]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const selectOptions = (
    <>
      <option value="00:15">00:15</option>
      <option value="00:30">00:30</option>
      <option value="00:45">00:45</option>
      <option value="01:00">01:00</option>
      <option value="01:15">01:15</option>
      <option value="01:30">01:30</option>
      <option value="01:45">01:45</option>
      <option value="02:00">02:00</option>
      <option value="02:15">02:15</option>
      <option value="02:30">02:30</option>
      <option value="02:45">02:45</option>
      <option value="03:00">03:00</option>
      <option value="03:15">03:15</option>
      <option value="03:30">03:30</option>
      <option value="03:45">03:45</option>
      <option value="04:00">04:00</option>
      <option value="04:15">04:15</option>
      <option value="04:30">04:30</option>
      <option value="04:45">04:45</option>
      <option value="05:00">05:00</option>
      <option value="05:15">05:15</option>
      <option value="05:30">05:30</option>
      <option value="05:45">05:45</option>
      <option value="06:00">06:00</option>
      <option value="06:15">06:15</option>
      <option value="06:30">06:30</option>
      <option value="06:45">06:45</option>
      <option value="07:00">07:00</option>
      <option value="07:15">07:15</option>
      <option value="07:30">07:30</option>
      <option value="07:45">07:45</option>
      <option value="08:00">08:00</option>
    </>
  );

  const createNewTask = (name, duration) => {
    if(name) {
    setIsCreatingTask(false);
    setTaskName("");
    setTaskDuration("00:30");
    setTasks([...tasks, { id: `${Math.floor(Math.random() * 100000)}`, text: name, duration }]);
    }
  };
  
  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleDragEnd(result, tasks, setTasks, todos, setTodos);
      }}
    >
      <Application>
        <Header>Planner</Header>
        <Container>
          <div>
            <TimeWakeUp
              value={wakeUpTime}
              type="time"
              id="appt"
              name="appt"
              min="09:00"
              max="18:00"
              onChange={(e) => {
                setWakeUpTime(e.target.value);
                localStorage.setItem("wakeUpTime", e.target.value);
              }}
            />
            <Droppable droppableId="todos">
              {(droppableProvided) => (
                <Todos
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <TodosItem
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                        >
                          <TodosItemStart>{todosTimes[index]}</TodosItemStart>
                          {todo.text}
                          <TodosItemDuration>
                            {todo.duration.slice(1)}
                          </TodosItemDuration>
                          {draggableProvided.placeholder}
                        </TodosItem>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </Todos>
              )}
            </Droppable>
          </div>
          <Droppable droppableId="tasks">
            {(droppableProvided) => (
              <Tasks
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <CreateTask onClick={() => setIsCreatingTask(!isCreatingTask)}>
                  <CreateIcon />
                  <span>Add task</span>
                </CreateTask>
                {isCreatingTask && (
                  <TaskItem>
                    <CreateTaskItem
                      value={taskName}
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="off"
                      placeholder="Write a task"
                      onChange={(e) => {
                        setTaskName(e.target.value);
                      }}
                    />
                    <CreateTaskItemDuration
                      value={taskDuration}
                      onChange={(e) => {
                        setTaskDuration(e.target.value);
                      }}
                    >
                      {selectOptions}
                    </CreateTaskItemDuration>
                    <ConfirmTask
                      onClick={() => createNewTask(taskName, taskDuration)}
                    />
                  </TaskItem>
                )}
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(draggableProvided) => (
                      <TaskItem
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                      >
                        <TodosItemDuration>
                          {task.duration.slice(1)}
                        </TodosItemDuration>
                        {task.text}
                        {draggableProvided.placeholder}
                      </TaskItem>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </Tasks>
            )}
          </Droppable>
        </Container>
      </Application>
    </DragDropContext>
  );
}

export default App;
