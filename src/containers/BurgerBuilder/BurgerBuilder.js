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
import actions from '../../store/actions';

class BurgerBuilder extends Component {
  static propTypes = {
    history: PropTypes.any,
    ings: PropTypes.any,
    onIngredientRemoved: PropTypes.func,
    onIngredientAdded: PropTypes.func,
    totalPrice: PropTypes.number,
  };
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get('https://myburger-6eab1.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(() => {
    //     this.setState({ error: true });
    //   });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
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
    const { purchasing, loading, error } = this.state;
    const {
      totalPrice,
      ings,
      onIngredientAdded,
      onIngredientRemoved,
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

    if (loading) {
      orderSummary = <Spinner></Spinner>;
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
      dispatch({ type: actions.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: ingredientName =>
      dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName }),
  };
};
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
