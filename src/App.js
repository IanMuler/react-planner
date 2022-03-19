import React, { useEffect } from "react";
import { Container, Header, Application, TimeWakeUp } from "./style.js";
import { handleDragEnd } from "./utils/handleDragEnd.js";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "./components/TodoList/index.js";
import TaskList from "./components/TaskList/index.js";

function App() {
  const [todos, setTodos] = React.useState([
    {
      id: "1",
      text: "Wake up",
      duration: "00:30",
    },
  ]);
  const [generalTasks, setGeneralTasks] = React.useState([]);
  const [dialyTasks, setDialyTasks] = React.useState([]);
  const [onceTasks, setOnceTasks] = React.useState([]);

  const [wakeUpTime, setWakeUpTime] = React.useState("");

  useEffect(() => {
    setWakeUpTime(localStorage.getItem("wakeUpTime") || "09:00");
    setTodos(JSON.parse(localStorage.getItem("todos")) || todos);
    setGeneralTasks(
      JSON.parse(localStorage.getItem("generalTasks")) || generalTasks
    );
    setDialyTasks(JSON.parse(localStorage.getItem("dialyTasks")) || dialyTasks);
    setOnceTasks(JSON.parse(localStorage.getItem("onceTasks")) || onceTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("generalTasks", JSON.stringify(generalTasks));
  }, [generalTasks]);

  useEffect(() => {
    localStorage.setItem("dialyTasks", JSON.stringify(dialyTasks));
  }, [dialyTasks]);

  useEffect(() => {
    localStorage.setItem("onceTasks", JSON.stringify(onceTasks));
  }, [onceTasks]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleDragEnd(
          result,
          generalTasks,
          setGeneralTasks,
          dialyTasks,
          setDialyTasks,
          onceTasks,
          setOnceTasks,
          todos,
          setTodos
        );
      }}
    >
      <Application>
        <Header>Planner</Header>

        <Container>
          <div>
            <TimeWakeUp
              value={wakeUpTime}
              type="time"
              onChange={(e) => {
                setWakeUpTime(e.target.value);
                localStorage.setItem("wakeUpTime", e.target.value);
              }}
            />
            <TodoList todos={todos} wakeUpTime={wakeUpTime} />
          </div>

          <TaskList
            title="General"
            tasks={generalTasks}
            setTasks={setGeneralTasks}
          />
          <TaskList title="Daily" tasks={dialyTasks} setTasks={setDialyTasks} />
          <TaskList title="Once" tasks={onceTasks} setTasks={setOnceTasks} />
        </Container>
      </Application>
    </DragDropContext>
  );
}

export default App;
