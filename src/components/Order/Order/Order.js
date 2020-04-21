import React from 'react';
import PropTypes from 'prop-types';
import classes from './Order.css';

function Order(props) {
  return (
    <div className={classes.Order}>
      <p>
        Ingredients: Salad ({props.order.ingredients.salad}), Meat (
        {props.order.ingredients.meat}), Cheese (
        {props.order.ingredients.cheese}
        ), Bacon ({props.order.ingredients.bacon}
        ),
      </p>
      <p>
        Price: <strong>USD {props.order.price}</strong>
      </p>
    </div>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    ingredients: PropTypes.shape({
      salad: PropTypes.number,
      meat: PropTypes.number,
      cheese: PropTypes.number,
      bacon: PropTypes.number,
    }),
    price: PropTypes.string,
  }),
};

export default Order;
