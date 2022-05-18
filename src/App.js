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
  const [wakeUpTime, setWakeUpTime] = React.useState("");

  useEffect(() => {
    localStorage.setItem("tasksTodo", JSON.stringify(tasksTodo));
  }, [tasksTodo]);

  useEffect(() => {
    localStorage.setItem("generalTasks", JSON.stringify(generalTasks));
  }, [generalTasks]);

  useEffect(() => {
    localStorage.setItem("dialyTasks", JSON.stringify(dialyTasks));
  }, [dialyTasks]);

  useEffect(() => {
    localStorage.setItem("onceTasks", JSON.stringify(onceTasks));
  }, [onceTasks]);

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
      setTasksTodo([
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
          tasksTodo,
          setTasksTodo
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
            <TodoList
              tasks={tasksTodo}
              setTasks={setTasksTodo}
              wakeUpTime={wakeUpTime}
            />

            <TaskList title="General" />
            <TaskList title="Daily" />
            <TaskList title="Once" />
          </div>
        </Container>
      </Application>
    </DragDropContext>
  );
}

export default App;
