import React, { useReducer } from "react";
import TasksContext from "./TasksContext";
import TasksReducer from "./TasksReducer";
import { GET_TASKS } from "../types";

const TasksState = (props) => {
  const initialState = {
    generalTasks: [],
    dialyTasks: [],
    onceTasks: [],
    tasksTodo: [
      {
        id: "1",
        draggableId: "01",
        text: "Wake up",
        duration: "00:30",
      },
    ],
  };

  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const getTasks = () => {
    dispatch({
      type: GET_TASKS,
      payload: {
        generalTasks:
          JSON.parse(localStorage.getItem("generalTasks")) ||
          initialState.generalTasks,
        dialyTasks:
          JSON.parse(localStorage.getItem("dialyTasks")) ||
          initialState.dialyTasks,
        onceTasks:
          JSON.parse(localStorage.getItem("onceTasks")) ||
          initialState.onceTasks,
        tasksTodo:
          JSON.parse(localStorage.getItem("tasksTodo")) ||
          initialState.tasksTodo,
      },
    });

  return (
    <TasksContext.Provider
      value={{
        generalTasks: state.generalTasks,
        dialyTasks: state.dialyTasks,
        onceTasks: state.onceTasks,
        tasksTodo: state.tasksTodo,
        getTasks,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default UserState;
