import React from 'react';
// import PropTypes from 'prop-types';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function navigationItems() {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
}

navigationItems.propTypes = {};

export default navigationItems;
