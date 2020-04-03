import React from 'react';
import PropTypes from 'prop-types';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

function toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <Menu clicked={props.toggleSideDrawer}></Menu>
      <div className={classes.Logo}>
        <Logo></Logo>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems></NavigationItems>
      </nav>
    </header>
  );
}

toolbar.propTypes = {
  toggleSideDrawer: PropTypes.func,
};

export default toolbar;
