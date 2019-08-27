import React from 'react';

const DeleteBtn = props => {
  return (
    <a
      className="waves-effect waves-light btn red darken-2 col offset-s1"
      onClick={props.onDeleteCompleted}
    >Delete completed</a>
  )
};

export default DeleteBtn