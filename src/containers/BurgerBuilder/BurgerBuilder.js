import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class BurgerBuilder extends Component {
  static propTypes = {
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
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  render() {
    const { purchasing } = this.state;
    const {
      totalPrice,
      ings,
      onIngredientAdded,
      onIngredientRemoved,
      error,
      isAuthenticated,
    } = this.props;

    const disableInfo = {
      ...this.props.ings,
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
            purchasable={this.updatePurchaseState(ings)}
            isAuth={isAuthenticated}
            ordered={this.purchaseHandler}></BuildControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={ings}
          totalPice={totalPrice}></OrderSummary>
      );
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => {
      dispatch(actions.initIngredients());
    },
    onInitPurchased: () => {
      dispatch(actions.purchaseInit());
    },
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
};
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
