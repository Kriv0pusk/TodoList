// action types
export const CHANGE_LOADING = "CHANGE_LOADING";
export const GET_TODOS = "GET_TODOS";
export const DELETE_TODO = "DELETE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const COMPLETE_ALL_TODOS = "COMPLETE_ALL_TODOS";
export const DELETE_COMPLETED_TODOS = "DELETE_COMPLETED_TODOS";

// other constants
const url = "https://todo-backend-sinatra.herokuapp.com/todos";

// actions
export const changeLoading = payload => {
  return { type: CHANGE_LOADING, payload };
};

export const getTodos = () => {
  return async dispatch => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      result.sort((a, b) => {
        return a.order - b.order;
      });
      dispatch({ type: GET_TODOS, payload: result });
      dispatch(changeLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTodo = (title, order) => {
  return async dispatch => {
    dispatch(changeLoading(true));
    const todo = {
      title,
      order,
      completed: false
    };
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(todo)
      });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTodo = (id, todos, index) => {
  return async dispatch => {
    dispatch(changeLoading(true));
    try {
      await fetch(`${url}/${id}`, { method: "DELETE" });
      const payload = todos.filter((todo, idx) => idx !== index);
      dispatch({ type: DELETE_TODO, payload });
      dispatch(changeLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const completeTodo = (id, todos, index) => {
  return async dispatch => {
    dispatch(changeLoading(true));
    try {
      await fetch(`${url}/${id}`, { method: "PATCH" });
      const payload = todos.map(todo => {
        if (todo.uid === todos[index].uid) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      dispatch({ type: COMPLETE_TODO, payload });
      dispatch(changeLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const completeAllTodos = todos => {
  return dispatch => {
    dispatch(changeLoading(true));
    try {
      const ids = todos.map(todo => todo.uid);
      const payload = todos.map(async (todo, index) => {
        if (!todo.completed) {
          await fetch(`${url}/${ids[index]}`, { method: "PATCH" });
          todo.completed = !todo.completed;
        }
        return todo;
      });
      dispatch({ type: COMPLETE_ALL_TODOS, payload });
      dispatch(changeLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCompletedTodos = todos => {
  return dispatch => {
    dispatch(changeLoading(true));
    try {
      const ids = todos.filter(todo => todo.completed).map(todo => todo.uid); //completed ids arr
      ids.forEach(async id => {
        await fetch(`${url}/${id}`, { method: "DELETE" });
      });
      const payload = todos.filter(todo => !todo.completed);
      dispatch({ type: DELETE_COMPLETED_TODOS, payload });
      dispatch(changeLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};
