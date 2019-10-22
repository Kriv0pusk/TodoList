import {
  CHANGE_LOADING,
  GET_TODOS,
  DELETE_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  DELETE_COMPLETED_TODOS
} from "../actions/todos";

const initialState = {
  isLoading: true,
  todos: []
};

function todoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case GET_TODOS:
      return {
        ...state,
        todos: payload
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: payload
      };
    case COMPLETE_TODO:
      return {
        ...state,
        todos: payload
      };
    case COMPLETE_ALL_TODOS:
      return {
        ...state,
        todos: payload
      };
    case DELETE_COMPLETED_TODOS:
      return {
        ...state,
        todos: payload
      };
    default:
      return state;
  }
}

export default todoReducer;
