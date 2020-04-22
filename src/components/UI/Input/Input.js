import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

function Input(props) {
  let inputElement = null;
  const inputClasses = [classes.Input];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input': {
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    }
    case 'textarea': {
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    }
    case 'select': {
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      );
      break;
    }
    default: {
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    }
  }

  return (
    <div>
      <label className={classes.Label} htmlFor="">
        {props.label}
      </label>
      {inputElement}
    </div>
  );
}

Input.propTypes = {
  elementType: PropTypes.string,
  label: PropTypes.string,
  elementConfig: PropTypes.shape({
    options: PropTypes.array,
  }),
  value: PropTypes.string,
  changed: PropTypes.func,
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.any,
  touched: PropTypes.bool,
};

export default Input;
