import userActionTypes from './user.types';

export const signUpStart = userData => ({
  type: userActionTypes.SIGN_UP_START,
  payload: userData,
})
export const signUpSuccess = userCredentials => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: userCredentials,
})
export const signUpFailure = error => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
})
export const signInStart = userData => ({
  type: userActionTypes.SIGN_IN_START,
  payload: userData,
})
export const signInSuccess = userCredentials => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: userCredentials,
})
export const signInFailure = error => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
})
export const signOutStart = userData => ({
  type: userActionTypes.SIGN_OUT_START,
  payload: userData,
})
export const signOutSuccess = userCredentials => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
  payload: userCredentials,
})
export const signOutFailure = error => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
})
export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
})
