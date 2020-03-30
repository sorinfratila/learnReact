import React from 'react';

const person = props => {
  return (
    <div className="Person" onClick={props.click}>
      <p>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <div className="wrapper" onClickCapture={e => e.stopPropagation()}>
        <input type="text" onChange={props.changed} value={props.name} />
      </div>
    </div>
  );
};

export default person;
