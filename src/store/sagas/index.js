import { takeEvery } from 'redux-saga/effects';
import actions from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';

import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import { initIngredientsSaga } from './burgerBuilder';

export function* watchAuth() {
  yield takeEvery(actions.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actions.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actions.AUTH_USER, authUserSaga);
  yield takeEvery(actions.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchOrder() {
  yield takeEvery(actions.PURCHASE_BURGER_INITIATE, purchaseBurgerSaga);
  yield takeEvery(actions.FETCH_ORDERS_INITIATE, fetchOrdersSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actions.INIT_INGREDIENTS, initIngredientsSaga);
}
