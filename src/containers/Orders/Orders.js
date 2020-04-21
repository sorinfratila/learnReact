import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }

        this.setState({ loading: true, orders: fetchedOrders });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order order={order} key={order.key}></Order>;
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
