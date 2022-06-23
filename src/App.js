import React, { useEffect } from "react";
import {
  Container,
  Header,
  Application,
  TimeWakeUp,
  RefreshIcon,
  TodoContainer,
  TodoOptions,
  TasksContainer,
} from "./style.js";
import { handleDragEnd } from "./utils/handleDragEnd.js";
import { DragDropContext } from "react-beautiful-dnd";
import { refreshToDoList } from "./utils/todo.js";
import TodoList from "./components/todo-list";
import TaskList from "./components/task-list";
import { Context } from "./context/state";

function App() {
  const [wakeUpTime, setWakeUpTime] = React.useState("");
  const context = React.useContext(Context);

  const { startTime } = context;

  const handleWakeUpTime = (e) => {
    startTime.update(e.target.value);
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleDragEnd(result, context);
      }}
    >
      <Application>
        <Header>Planner</Header>

        <Container>
          <TodoContainer>
            <TodoOptions>
              <TimeWakeUp
                value={startTime.value}
                type="time"
                onChange={(e) => {
                  handleWakeUpTime(e);
                }}
              />
              <RefreshIcon onClick={() => refreshToDoList(context)} />
            </TodoOptions>
            <TodoList wakeUpTime={startTime.value} />
          </TodoContainer>
          <TasksContainer>
            <TaskList category="general" />
            <TaskList category="daily" />
            <TaskList category="once" />
          </TasksContainer>
        </Container>
      </Application>
    </DragDropContext>
  );
}

export default App;
