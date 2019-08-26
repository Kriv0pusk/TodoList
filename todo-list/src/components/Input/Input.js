import React from 'react'

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const todo = {
      title: this.input.value,
      completed: false
    };
    try {
      await fetch(this.props.url, {
        method: 'POST',
        body: JSON.stringify(todo)
      });
      this.props.getTodos();
    } catch (e) {
      throw new Error(e);
    }
    this.input.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-field">
          <input type="text" ref={input => {this.input = input}}/>
          <label>Todo title</label>
        </div>
      </form>
    )
  }
}