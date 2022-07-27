import React, { createContext, useEffect, useState, useReducer } from "react";
import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TODO,
  DELETE_TODO,
  UPDATE_START,
  UPDATE_VISIBLE,
  UPDATE_DRAGGING_TODO,
  UPDATE_DRAGGING_TASK,
  UPDATE_LOADING,
  UPDATE_STATE,
} from "./types";
import { v4 } from "uuid";
import reducer from "./reducer";
import { state as stateDB } from "../api/state";

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
  wakeUpTime: {
    value: "",
  },
  tasksVisible: {
    value: false,
  },
  isDraggingTodo: {
    value: false,
  },
  isDraggingTask: {
    value: false,
  },
  loading: {
    value: false,
  },
};

export const Context = createContext(initialState);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateId, setStateId] = useState(null);

  useEffect(() => {
    const handleState = (data, initialState) => {
      const stateFromDB = data.body[0].state;
      if (stateFromDB) {
        updateState(stateFromDB);
      } else {
        updateState(initialState);
      }
      setStateId(data.body[0]._id);
      updateLoading(false);
    };

    updateLoading(true);

    stateDB
      .get()
      .then((data) => {
        handleState(data);
      })
      .catch(() => {
        stateDB
          .create(initialState)
          .then((data) => {
            handleState(data, initialState);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, []);

  useEffect(() => {
    if (stateId) {
      stateDB.update(stateId, state);
    }
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
  const updateVisible = (value) =>
    dispatch({ type: UPDATE_VISIBLE, payload: value });
  const updateDraggingToDo = (value) =>
    dispatch({ type: UPDATE_DRAGGING_TODO, payload: value });
  const updateDraggingTask = (value) =>
    dispatch({ type: UPDATE_DRAGGING_TASK, payload: value });
  const updateLoading = (value) =>
    dispatch({ type: UPDATE_LOADING, payload: value });
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
        wakeUpTime: {
          ...state.wakeUpTime,
          update: updateStart,
        },
        tasksVisible: {
          ...state.tasksVisible,
          update: updateVisible,
        },
        isDraggingTodo: {
          ...state.isDraggingTodo,
          update: updateDraggingToDo,
        },
        isDraggingTask: {
          ...state.isDraggingTask,
          update: updateDraggingTask,
        },
        loading: {
          ...state.loading,
          update: updateLoading,
        },
        updateState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
