import userActionTypes from './user.types';

export const signUpStart = userData => ({
  type: userActionTypes.SIGN_UP_START,
  payload: userData,
})
export const signUpSuccess = currentUser => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: currentUser,
})
export const signUpFailure = error => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
})
// export const signInStart = userData => ({
//   type: userActionTypes.SIGN_IN_START,
//   payload: userData,
// })
// export const signInSuccess = currentUser => ({
//   type: userActionTypes.SIGN_IN_SUCCESS,
//   payload: currentUser,
// })
// export const signInFailure = error => ({
//   type: userActionTypes.SIGN_IN_FAILURE,
//   payload: error,
// })
export const testRedux = text => ({
  type: userActionTypes.TEST_REDUX,
  payload: text,
})
