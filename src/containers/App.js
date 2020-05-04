import React, { Component, Suspense, lazy } from 'react';
import pt from 'prop-types';

import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

const Checkout = lazy(() => import('./Checkout/Checkout'));
const Orders = lazy(() => import('./Orders/Orders'));
const Auth = lazy(() => import('./Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

App.propTypes = {
  appTitle: pt.string,
  isAuthenticated: pt.bool,
  onTryAutoSignup: pt.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
