export enum userActionTypes {
  SIGN_UP_START = 'SIGN_UP_START',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',
  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
  SIGN_OUT_START = 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE',
  CHECK_USER_SESSION = 'CHECK_USER_SESSION',
  CLEAR_ERRORS = 'CLEAR_ERRORS'
};

export type UserError = 'validationErrors' | 'authErrors' | 'duplicateEntityError';

//export type User = {
  //email: string;
  //names: string;
  //userId: number;
//} | null

export default userActionTypes;
