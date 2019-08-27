import React from 'react';

const CompleteBtn = props => {
  return (
    <a
      className="waves-effect waves-light btn col"
      onClick={props.onCompleteAll}
    >Complete all</a>
  )
};
export default CompleteBtn