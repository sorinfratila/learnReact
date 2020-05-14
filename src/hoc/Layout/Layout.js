import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import pt from 'prop-types';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [showSideDrawer, toggleSideDrawer] = useState(false);

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        toggleSideDrawer={() => toggleSideDrawer(!showSideDrawer)}></Toolbar>
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={() => toggleSideDrawer(!showSideDrawer)}></SideDrawer>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

Layout.propTypes = {
  children: pt.element,
  isAuthenticated: pt.bool,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
