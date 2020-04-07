import React from 'react';
import classes from './Spinner.css';
// import PropTypes from 'prop-types';

function spinner() {
  return <div className={classes.Loader}></div>;
}

spinner.propTypes = {};

export default spinner;
