import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import pt from 'prop-types';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  static propTypes = {
    children: pt.element,
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
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}></Toolbar>
        <SideDrawer
          open={showSideDrawer}
          closed={this.toggleSideDrawerHandler}></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
