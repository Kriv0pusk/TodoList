import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import Input from './components/Input/Input'
import Loader from './components/Loader/Loader'
import TodoList from './components/TodoList/TodoList'
import CompleteBtn from './components/Buttons/CompleteBtn'
import DeleteBtn from './components/Buttons/DeleteBtn'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos: []
    };
    this.url = 'https://todo-backend-sinatra.herokuapp.com/todos';
    this.getTodos = this.getTodos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompleteAll = this.handleCompleteAll.bind(this);
    this.handleDeleteCompleted = this.handleDeleteCompleted.bind(this);
  }

  async getTodos() {
    try {
      const response = await fetch(this.url);
      const result = await response.json();
      result.sort((a, b) => {
        return a.order - b.order;
      });
      this.setState( {
        loading: false,
        todos: result
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleSubmit(title, order) {
    const todo = {
      title: title.value,
      order: order.value,
      completed: false
    };
    try {
      await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(todo)
      });
      this.getTodos();
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleComplete(id, index) {
    try {
      await fetch(`${this.url}/${id}`, { method: 'PATCH' });

      const newTodos = this.state.todos.map(todo => {
        if (todo.uid === this.state.todos[index].uid) {
          todo.completed = !todo.completed
        }
        return todo
      });
      this.setState({
        todos: newTodos
      })
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleDelete(id, index) {
    this.setState({
      loading: true
    });
    try {
      await fetch(`${this.url}/${id}`, { method: 'DELETE' });

      const newTodos = this.state.todos.filter((todo, idx) => idx !== index);
      this.setState({
        todos: newTodos,
        loading: false
      })
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleCompleteAll() {
    try {
      const ids = this.state.todos.map(todo => todo.uid);
      for (let i = 0; i < ids.length; i++) {
        if (!this.state.todos[i].completed) {
          await fetch(`${this.url}/${ids[i]}`, { method: 'PATCH' });
        }
      }
      const newTodos = this.state.todos.map(todo => {
        if (!todo.completed) {
          todo.completed = !todo.completed
        }
        return todo
      });
      this.setState({
        todos: newTodos
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleDeleteCompleted() {
    this.setState({
      loading: true
    });
    try {
      const ids = this.state.todos.filter(todo => todo.completed)
                                  .map(todo => todo.uid);
      for (let i = 0; i < ids.length; i++) {
        await fetch(`${this.url}/${ids[i]}`, { method: 'DELETE' });
      }
      const newTodos = this.state.todos.filter(todo => !todo.completed);
      this.setState({
        todos: newTodos,
        loading: false
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div className="container">
        <h1>TodoApp</h1>

        <Input
          state={this.state}
          onSubmit={this.handleSubmit}
        />
        {
          this.state.loading ?
            <Loader /> :
            <div className="row">
              <TodoList
                state={this.state}
                onComplete={this.handleComplete}
                onDelete={this.handleDelete}
              />
              <CompleteBtn
                state={this.state}
                onCompleteAll={this.handleCompleteAll}
              />
              <DeleteBtn
                state={this.state}
                onDeleteCompleted={this.handleDeleteCompleted}
              />
            </div>
        }
      </div>
    )
  }
}

export default App;