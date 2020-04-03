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
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}>
        ORDER NOW
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
};

export default buildControls;
