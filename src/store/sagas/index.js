import { takeEvery, all, takeLatest } from 'redux-saga/effects';
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
  // all let's the user run simultaneos asynchronous tasks like 2 axios calls
  yield all([
    takeEvery(actions.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actions.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actions.AUTH_USER, authUserSaga),
    takeEvery(actions.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchOrder() {
  // takeLatest makes sure that only the last action of this type called matters
  yield takeLatest(actions.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actions.FETCH_ORDERS, fetchOrdersSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actions.INIT_INGREDIENTS, initIngredientsSaga);
}
