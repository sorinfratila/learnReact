import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  static propTypes = {
    history: PropTypes.any,
    location: PropTypes.any,
    match: PropTypes.shape({
      path: PropTypes.string,
    }),
    ings: PropTypes.any,
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const { ings } = this.props;
    let summary = <Redirect to="/"></Redirect>;

    if (ings) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={ings}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCanceled={this.checkoutCanceledHandler}></CheckoutSummary>
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}></Route>
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
