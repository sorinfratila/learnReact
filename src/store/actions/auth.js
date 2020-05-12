import actions from './actionTypes';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = error => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actions.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actions.AUTH_CHECK_TIMEOUT,
    expirationTime,
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actions.AUTH_USER,
    email,
    password,
    isSignup,
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: actions.AUTH_CHECK_STATE,
  };
};
