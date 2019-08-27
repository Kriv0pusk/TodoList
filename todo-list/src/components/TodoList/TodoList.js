import React from 'react'
import './TodoList.css'

const TodoList = props => {
  return (
    <ul className="todo-list">
      {props.state.todos.map((todo, index) =>
        <li className="todo-item" key={todo.uid}>
          <label>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={props.onComplete.bind(this, todo.uid, index)}/>
            <span>{todo.title}</span>
          </label>
          <i
              className="material-icons red-text"
              onClick={props.onDelete.bind(this, todo.uid, index)}
          >delete</i>
        </li>
      )}
    </ul>
  )
};

export default TodoList