import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  UPDATE_TODO,
  DELETE_TODO,
  UPDATE_STATE,
  UPDATE_VISIBLE,
  UPDATE_START,
  UPDATE_DRAGGING_TODO,
  UPDATE_DRAGGING_TASK,
  UPDATE_POSITIONS,
} from "./types";

export default function reducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          lists: {
            ...state.tasks.lists,
            [payload.category]: [
              ...state.tasks.lists[payload.category],
              payload,
            ],
          },
        },
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          lists: {
            ...state.tasks.lists,
            [payload.category]: state.tasks.lists[payload.category].filter(
              (task) => task.id !== payload.id
            ),
          },
        },
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          lists: {
            ...state.tasks.lists,
            [payload.category]: state.tasks.lists[payload.category].map(
              (task) => (task.id === payload.id ? payload : task)
            ),
          },
        },
      };
    case UPDATE_TODO:
      return {
        ...state,
        todo: {
          ...state.todo,
          list: state.todo.list.map((task) =>
            payload.assigned
              ? // if is assigned we are editing the task from tasks lists
                task.id === payload.id
                ? {
                    ...task,
                    text: payload.text,
                    duration: payload.duration,
                    start: null,
                  }
                : task
              : // if assigned dont exist the task is at todo list and is necessary edit by draggableId
              task.draggableId === payload.draggableId
              ? { ...task, start: payload.start }
              : task
          ),
        },
      };
    case DELETE_TODO:
      const list = state.todo.list.filter(
        (task) =>
          payload.assigned
            ? task.id !== payload.id // if is assigned we are deleting the task from tasks lists
            : task.draggableId !== payload.draggableId // if assigned dont exist the task is at todo list and is necessary delete by draggableId
      );

      if (list.length > 0) {
        // at least a start value must be annulled to reassign then
        list[0].start = null;
      }

      return {
        ...state,
        todo: {
          ...state.todo,
          list,
        },
      };
    case UPDATE_START:
      return {
        ...state,
        wakeUpTime: {
          ...state.wakeUpTime,
          value: payload,
        },
      };
    case UPDATE_VISIBLE:
      return {
        ...state,
        tasksVisible: {
          ...state.tasksVisible,
          value: payload,
        },
      };
    case UPDATE_DRAGGING_TODO:
      return {
        ...state,
        isDraggingTodo: {
          ...state.isDraggingTodo,
          value: payload,
        },
      };
    case UPDATE_DRAGGING_TASK:
      return {
        ...state,
        isDraggingTask: {
          ...state.isDraggingTask,
          value: payload,
        },
      };
    case UPDATE_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
