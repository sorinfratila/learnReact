import React, { Suspense, lazy, useEffect } from 'react';
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

const App = props => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

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
