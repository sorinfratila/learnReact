import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          subtracted={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}></BuildControl>
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

buildControls.propTypes = {
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  disabled: PropTypes.any,
  price: PropTypes.number,
  purchasable: PropTypes.bool,
  ordered: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default buildControls;
