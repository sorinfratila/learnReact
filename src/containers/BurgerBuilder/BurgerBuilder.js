import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 2,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    console.log('sum', sum);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = {
      ...ingredients,
    };

    updateIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchaseState(updateIngredients);
  };

  removeIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;

    const oldCount = ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updateIngredients = {
        ...ingredients,
      };

      updateIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = totalPrice;
      const newPrice = oldPrice - priceAddition;

      this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
      this.updatePurchaseState(updateIngredients);
    }
  };

  render() {
    const { ingredients, totalPrice, purchasable } = this.state;
    const disableInfo = {
      ...ingredients,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          price={totalPrice}
          disabled={disableInfo}
          ingredientRemoved={this.removeIngredientHandler}
          ingredientAdded={this.addIngredientHandler}
          purchasable={purchasable}></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;