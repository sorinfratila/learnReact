import React from 'react';
import PropTypes from 'prop-types';
import classes from '../Person/Person.css';

const person = props => {
  return (
    <div className={classes.Person} onClick={props.click}>
      <p>
        I&#39;m {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <div className="wrapper" onClickCapture={e => e.stopPropagation()}>
        <input type="text" onChange={props.changed} value={props.name} />
      </div>
    </div>
  );
};

person.propTypes = {
  click: PropTypes.func,
  age: PropTypes.number,
  name: PropTypes.string,
  changed: PropTypes.func,
  children: PropTypes.any,
};

export default person;
