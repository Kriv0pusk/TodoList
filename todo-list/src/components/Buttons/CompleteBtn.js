import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeAllTodos } from "./../../store/actions/todos";

const CompleteBtn = () => {
  const todos = useSelector(state => state.todoReducer.todos);
  const dispatch = useDispatch();

  return (
    <a
      className="waves-effect waves-light btn col"
      onClick={dispatch(completeAllTodos(todos))}
    >
      Complete all
    </a>
  );
};
export default CompleteBtn;
