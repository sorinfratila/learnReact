import React from 'react';
import PropTypes from 'prop-types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tasted well</h1>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
}

CheckoutSummary.propTypes = {
  ingredients: PropTypes.any,
  checkoutCanceled: PropTypes.func,
  checkoutContinued: PropTypes.func,
};

export default CheckoutSummary;
