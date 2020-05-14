import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const { ings } = props;
  let summary = <Redirect to="/"></Redirect>;

  if (ings) {
    const purchasedRedirect = props.purchased ? (
      <Redirect to="/"></Redirect>
    ) : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCanceled={checkoutCanceledHandler}></CheckoutSummary>
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}></Route>
      </div>
    );
  }
  return <div>{summary}</div>;
};

Checkout.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  ings: PropTypes.any,
  onInitPurchase: PropTypes.func,
  purchased: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
