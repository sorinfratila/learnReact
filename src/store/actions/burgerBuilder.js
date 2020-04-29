import actions from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
  return {
    type: actions.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = name => {
  return {
    type: actions.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

const setIngredients = ingredients => {
  return {
    type: actions.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actions.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://myburger-6eab1.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(() => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
