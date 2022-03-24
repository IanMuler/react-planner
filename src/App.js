import React, { useEffect } from "react";
import {
  Container,
  Header,
  Application,
  TimeWakeUp,
  RefreshIcon,
} from "./style.js";
import { handleDragEnd } from "./utils/handleDragEnd.js";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "./components/TodoList/index.js";
import TaskList from "./components/TaskList/index.js";

function App() {
  const [todos, setTodos] = React.useState([
    {
      id: "1",
      draggableId: "01",
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

  // create a function to add assigned: false to each task from task lists
  const unassignTasks = () => {
    setGeneralTasks(
      generalTasks.map((task) => {
        return { ...task, assigned: false };
      })
    );
    setDialyTasks(
      dialyTasks.map((task) => {
        return { ...task, assigned: false };
      })
    );
    setOnceTasks(
      onceTasks.map((task) => {
        return { ...task, assigned: false };
      })
    );
  };

  const refreshToDoList = () => {
    if (window.confirm("Are you sure you want to refresh the To Do List?")) {
      setTodos([
        {
          id: "1",
          draggableId: "01",
          text: "Wake up",
          duration: "00:30",
        },
      ]);
      unassignTasks();
    }
  };

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
          <div
            style={{
              display: "flex",
              width: "300px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TimeWakeUp
              value={wakeUpTime}
              type="time"
              onChange={(e) => {
                setWakeUpTime(e.target.value);
                localStorage.setItem("wakeUpTime", e.target.value);
              }}
            />
            <RefreshIcon onClick={refreshToDoList} />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TodoList todos={todos} wakeUpTime={wakeUpTime} />

            <TaskList
              title="General"
              tasks={generalTasks}
              setTasks={setGeneralTasks}
              todos={todos}
              setTodos={setTodos}
            />
            <TaskList
              title="Daily"
              tasks={dialyTasks}
              setTasks={setDialyTasks}
              todos={todos}
              setTodos={setTodos}
            />
            <TaskList
              title="Once"
              tasks={onceTasks}
              setTasks={setOnceTasks}
              todos={todos}
              setTodos={setTodos}
            />
          </div>
        </Container>
      </Application>
    </DragDropContext>
  );
}

export default App;
