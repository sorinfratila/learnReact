import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
  static propTypes = {
    history: PropTypes.any,
    location: PropTypes.any,
    match: PropTypes.shape({
      path: PropTypes.string,
    }),
  };

  state = {
    ingredients: {},
    price: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = Object.create(null);
    let price;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else ingredients[param[0]] = +param[1];
    }

    this.setState({ ingredients, price: Number(price).toFixed(2) });
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCanceled={this.checkoutCanceledHandler}></CheckoutSummary>
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}></ContactData>
          )}></Route>
      </div>
    );
  }
}
