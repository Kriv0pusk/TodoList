import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeTodo, deleteTodo } from "./../../store/actions/todos";
import "./TodoList.css";

const TodoList = () => {
  const todos = useSelector(state => state.todoReducer.todos);
  const dispatch = useDispatch();

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li className="todo-item" key={todo.uid}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={dispatch(completeTodo(todo.uid, todos, index))}
            />
            <span>{todo.title}</span>
          </label>
          <i
            className="material-icons red-text"
            onClick={dispatch(deleteTodo(todo.uid, todos, index))}
          >
            delete
          </i>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
