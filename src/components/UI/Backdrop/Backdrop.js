import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

function backdrop(props) {
  return props.show ? (
    <div onClick={props.clicked} className={classes.Backdrop}></div>
  ) : null;
}

backdrop.propTypes = { show: PropTypes.any, clicked: PropTypes.func };

export default backdrop;
