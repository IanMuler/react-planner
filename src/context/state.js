import React, { createContext, useEffect, useReducer } from "react";
import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TODO,
  DELETE_TODO,
  UPDATE_START,
  UPDATE_STATE,
} from "./types";
import { v4 } from "uuid";
import reducer from "./reducer";

const initialState = {
  tasks: {
    lists: {
      general: [],
      daily: [],
      once: [],
    },
  },
  todo: {
    list: [],
  },
  startTime: {
    value: "",
  },
};

const actualState = window.localStorage.getItem("state")
  ? JSON.parse(window.localStorage.getItem("state"))
  : initialState;

export const Context = createContext(actualState);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, actualState);

  // Save state to localStorage
  useEffect(() => {
    window.localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const getTasks = () => dispatch({ type: GET_TASKS, payload: state.tasks });
  const addTask = (task, category) => {
    const id = v4();
    dispatch({
      type: ADD_TASK,
      payload: {
        ...task,
        id,
        draggableId: `_${id}`,
        assigned: false,
        once: category === "once" ? true : false,
        category,
      },
    });
  };
  const deleteTask = (task) => dispatch({ type: DELETE_TASK, payload: task });
  const updateTask = (task) => dispatch({ type: UPDATE_TASK, payload: task });
  const updateTodo = (task) => dispatch({ type: UPDATE_TODO, payload: task });
  const deleteTodo = (task) => dispatch({ type: DELETE_TODO, payload: task });
  const updateStart = (time) => dispatch({ type: UPDATE_START, payload: time });
  const updateState = (list) => dispatch({ type: UPDATE_STATE, payload: list });

  return (
    <Context.Provider
      value={{
        tasks: {
          ...state.tasks,
          get: getTasks,
          add: addTask,
          delete: deleteTask,
          update: updateTask,
        },
        todo: {
          ...state.todo,
          delete: deleteTodo,
          update: updateTodo,
        },
        startTime: {
          ...state.startTime,
          update: updateStart,
        },
        updateState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
