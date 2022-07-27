import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  Container,
  Header,
  Application,
  TimeWakeUp,
  RefreshIcon,
  TodoContainer,
  TodoOptions,
  Options,
  TasksContainer,
  ArrowIcon,
  Title,
} from "./style.js";
import { handleDragEnd } from "./utils/handleDragEnd.js";
import { DragDropContext } from "react-beautiful-dnd";
import { refreshToDoList } from "./utils/todo.js";
import TodoList from "./components/todo-list";
import TaskList from "./components/task-list";
import { useSwipe } from "./hooks/useSwipe.js";
import { Context } from "./context/state";
import DeleteIcon from "./components/delete-icon";
import LoadingSpinner from "./components/loading-spinner/index.jsx";

function App() {
  const context = useContext(Context);
  const { wakeUpTime, tasksVisible, isDraggingTodo, isDraggingTask, loading } =
    context;
  const isDragging = isDraggingTodo.value || isDraggingTask.value;
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    tasksVisible,
    isDragging
  );
  const [refreshing, setRefreshing] = useState(false);
  const isDesktop = window.innerWidth > 768;

  useEffect(() => {
    tasksVisible.update(isDesktop);
  }, [isDesktop]);

  const handleWakeUpTime = (e) => {
    wakeUpTime.update(e.target.value);
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        handleDragEnd(result, context);
      }}
    >
      <Application
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Header>
          <Title>Planner</Title>
        </Header>

        {loading.value && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <LoadingSpinner />
          </div>
        )}
        {!loading.value && (
          <Container>
            <TodoContainer>
              <TodoOptions>
                <TimeWakeUp
                  value={wakeUpTime.value}
                  type="time"
                  onChange={(e) => {
                    handleWakeUpTime(e);
                  }}
                />
                <Options>
                  {!isDesktop && (
                    <DeleteIcon isDragging={isDraggingTodo.value} />
                  )}
                  <RefreshIcon onClick={() => refreshToDoList(context)} />
                  {!isDesktop && (
                    <ArrowIcon
                      onClick={() => {
                        tasksVisible.update(!tasksVisible.value);
                      }}
                    />
                  )}
                </Options>
              </TodoOptions>
              <TodoList wakeUpTime={wakeUpTime.value} />
            </TodoContainer>
            <TasksContainer visible={tasksVisible.value}>
              <TaskList category="general" />
              <TaskList category="daily" />
              <TaskList category="once" />
            </TasksContainer>
          </Container>
        )}
      </Application>
    </DragDropContext>
  );
}

export default App;
