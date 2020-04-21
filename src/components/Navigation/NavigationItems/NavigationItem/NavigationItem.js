import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItem.css';
import { NavLink, withRouter } from 'react-router-dom';

const navigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact={props.exact}
        activeClassName={classes.active}
        to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
};

navigationItem.propTypes = {
  children: PropTypes.any,
  link: PropTypes.string,
  active: PropTypes.bool,
  exact: PropTypes.bool,
};

export default withRouter(navigationItem);
