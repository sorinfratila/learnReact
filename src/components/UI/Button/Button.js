import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

function button(props) {
  return (
    <button
      className={[classes.Button, classes[props.btntype]].join(' ')}
      {...props}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
}

button.propTypes = {
  clicked: PropTypes.func,
  children: PropTypes.string,
  btntype: PropTypes.string,
  disabled: PropTypes.bool,
};

export default button;
