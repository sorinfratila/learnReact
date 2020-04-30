import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function navigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
}

navigationItems.propTypes = {
  isAuthenticated: PropTypes.bool,
};

navigationItems.propTypes = {};

export default navigationItems;
