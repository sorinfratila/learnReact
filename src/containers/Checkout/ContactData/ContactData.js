import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
  static propTypes = {
    ingredients: PropTypes.any,
    price: PropTypes.number,
    history: PropTypes.any,
  };

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Sorin',
        address: {
          street: 'Test 1',
          zipCode: '1234',
          country: 'Romaniu',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };

    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" placeholder="your name" />
        <input
          className={classes.Input}
          type="email"
          placeholder="your email"
        />
        <input
          className={classes.Input}
          type="text"
          placeholder="your street"
        />
        <input
          className={classes.Input}
          type="text"
          placeholder="your postal code"
        />
      </form>
    );
    if (this.state.loading) {
      form = <Spinner></Spinner>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </div>
    );
  }
}
