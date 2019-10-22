import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodos } from "./store/actions/todos";

import Input from "./components/Input/Input";
import Loader from "./components/Loader/Loader";
import TodoList from "./components/TodoList/TodoList";
import CompleteBtn from "./components/Buttons/CompleteBtn";
import DeleteBtn from "./components/Buttons/DeleteBtn";

const App = () => {
  const isLoading = useSelector(state => state.todoReducer.isLoading);
  const length = useSelector(state => state.todoReducer.todos.length);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getTodos());
    };
    getData();
  }, []);

  return (
    <div className="container">
      <h1>TodoApp</h1>

      <Input />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          <TodoList />
          {length !== 0 && (
            <>
              <CompleteBtn />
              <DeleteBtn />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
