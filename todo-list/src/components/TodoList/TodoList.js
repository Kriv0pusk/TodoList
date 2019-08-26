import React from 'react'
import './TodoList.css'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="todo-list">
        {this.props.state.todos.map((todo) =>
          <li
              className="todo-item"
              key={todo.uid}
          >
            <label>
              <input type="checkbox" />
              <span>{todo.title}</span>
            </label>
            <i className="material-icons red-text">delete</i>
          </li>
        )}
      </ul>
    )
  }
}