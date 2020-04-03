import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey, i) => {
    return (
      <li key={igKey + i}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>Delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        TOTAL PRICE: <strong>{props.totalPice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button clicked={props.purchaseCanceled} btnType={'Danger'}>
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinued} btnType={'Success'}>
        CONTINUE
      </Button>
    </Aux>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object,
  purchaseCanceled: PropTypes.func,
  purchaseContinued: PropTypes.func,
  totalPice: PropTypes.number,
};

export default orderSummary;
