import actions from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actions.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => dispatch(purchaseBurgerFail(err)));
  };
};
