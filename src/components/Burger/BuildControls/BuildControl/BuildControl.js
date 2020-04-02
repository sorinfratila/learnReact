import React from 'react';
import classes from './BuildControl.css';
import PropTypes from 'prop-types';

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        disabled={props.disabled}
        onClick={props.subtracted}>
        Less
      </button>
      <button className={classes.More} onClick={props.added}>
        More
      </button>
    </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string,
  added: PropTypes.func,
  subtracted: PropTypes.func,
  disabled: PropTypes.bool,
};

export default buildControl;
