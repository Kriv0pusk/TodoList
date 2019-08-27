import React from 'react'

export default class Input extends React.Component {
  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.title, this.order);
    this.title.value = '';
    this.order.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="row valign-wrapper">
          <div className="input-field col s6">
            <input type="text" ref={inputTitle => this.title = inputTitle}/>
            <label>Todo title</label>
          </div>
          <div className="input-field col s3">
            <input type="text" ref={inputOrder => this.order = inputOrder}/>
            <label>Todo order</label>
          </div>
          <button className="btn waves-effect waves-light col s2 offset-s1" type="submit" name="action">Add Todo
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    )
  }
}