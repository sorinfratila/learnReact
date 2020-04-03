import React from 'react';
import menuIcon from '../../../assets/icons/menu.png';
import classes from './Menu.css';
import PropTypes from 'prop-types';

function menu(props) {
  return (
    <div onClick={props.clicked} className={classes.Menu}>
      <img src={menuIcon} alt="menu" />
    </div>
  );
}

menu.propTypes = {
  clicked: PropTypes.func,
};

export default menu;
