import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import pt from 'prop-types';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  static propTypes = {
    children: pt.element,
    isAuthenticated: pt.bool,
  };

  state = {
    showSideDrawer: false,
  };

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggleSideDrawer={this.toggleSideDrawerHandler}></Toolbar>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={showSideDrawer}
          closed={this.toggleSideDrawerHandler}></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
