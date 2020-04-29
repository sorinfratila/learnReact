import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  static propTypes = {
    onFetchOrders: PropTypes.func,
    orders: PropTypes.any,
    loading: PropTypes.bool,
  };

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner></Spinner>;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
        return <Order order={order} key={order.key}></Order>;
      });
    }
    return <div>{orders}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
