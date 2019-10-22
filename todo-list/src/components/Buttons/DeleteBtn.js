import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCompletedTodos } from "./../../store/actions/todos";

const DeleteBtn = () => {
  const todos = useSelector(state => state.todoReducer.todos);
  const dispatch = useDispatch();

  return (
    <a
      className="waves-effect waves-light btn red darken-2 col offset-s1"
      onClick={dispatch(deleteCompletedTodos(todos))}
    >
      Delete completed
    </a>
  );
};

export default DeleteBtn;
