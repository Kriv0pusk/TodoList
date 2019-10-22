import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./../../store/actions/todos";

const Input = () => {
  const dispatch = useDispatch();
  const inputTitle = useRef();
  const inputOrder = useRef();

  const handleSubmit = ev => {
    ev.preventDefault();
    dispatch(addTodo(inputTitle.current.value, inputOrder.current.value));
    inputTitle.current.value = "";
    inputOrder.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row valign-wrapper">
        <div className="input-field col s6">
          <input type="text" ref={inputTitle} />
          <label>Todo title</label>
        </div>
        <div className="input-field col s3">
          <input type="text" ref={inputOrder} />
          <label>Todo order</label>
        </div>
        <button
          className="btn waves-effect waves-light col s2 offset-s1"
          type="submit"
          name="action"
        >
          Add Todo
          <i className="material-icons right">send</i>
        </button>
      </div>
    </form>
  );
};
export default Input;
