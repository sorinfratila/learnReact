import React from 'react';
// import PropTypes from 'prop-types';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function navigationItems() {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
}

navigationItems.propTypes = {};

export default navigationItems;
