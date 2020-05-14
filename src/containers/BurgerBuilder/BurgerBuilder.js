import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const dispatch = useDispatch();

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = ingredientName =>
    dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = ingredientName =>
    dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);
  const onInitPurchased = () => {
    dispatch(actions.purchaseInit());
  };
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchased();
    props.history.push({
      pathname: '/checkout',
    });
  };

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const disableInfo = {
    ...ings,
  };

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = error ? (
    <p>Ingredients can&#39;t be loaded</p>
  ) : (
    <Spinner></Spinner>
  );

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          price={totalPrice}
          disabled={disableInfo}
          ingredientRemoved={ingName => onIngredientRemoved(ingName)}
          ingredientAdded={ingName => onIngredientAdded(ingName)}
          purchasable={updatePurchaseState(ings)}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}></BuildControls>
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ings}
        totalPice={totalPrice}></OrderSummary>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

BurgerBuilder.propTypes = {
  history: PropTypes.any,
  ings: PropTypes.any,
  onIngredientRemoved: PropTypes.func,
  onIngredientAdded: PropTypes.func,
  totalPrice: PropTypes.number,
  onInitIngredients: PropTypes.func,
  error: PropTypes.bool,
  onInitPurchased: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  onSetAuthRedirectPath: PropTypes.func,
};

export default withErrorHandler(BurgerBuilder, axios);
