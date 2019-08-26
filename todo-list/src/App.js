import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import Input from './components/Input/Input'
import Loader from './components/Loader/Loader'
import TodoList from './components/TodoList/TodoList'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos: []
    };
    this.url = 'https://todo-backend-sinatra.herokuapp.com/todos';
    this.getTodos = this.getTodos.bind(this);
  }

  async getTodos() {
    try {
      const response = await fetch(this.url);
      const result = await response.json();
      this.setState( {
        loading: false,
        todos: result
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

        <Input url={this.url} getTodos={this.getTodos}/>
        {
          this.state.loading ?
            <Loader /> :
            <TodoList state={this.state} />
        }
      </div>
    )
  }
}

export default App;