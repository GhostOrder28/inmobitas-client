import { AxiosError } from 'axios';
import { UserInfo } from '../../components/user-auth/user-auth.types';
import { ValidationError } from '../redux.types';
import { UserError } from './user.types';
import { AnyAction } from 'redux';
import { 
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  userSignOutSuccess,
  userSignOutFailure,
  signOutWithError,
  clearErrors,
  requestUserInfoForSignInSuccess,
  requestUserInfoForSignInFailure,
  generateGuestStart,
  generateGuestSuccess,
  generateGuestFailure,
} from './user.actions'
import { ClientError } from '../../errors/errors.types';

export type ResponseError = { [ Property in UserError ]: ValidationError[] | string };

export type UserState = {
  readonly currentUser: UserInfo | null;
  readonly guestPending: boolean;
  readonly errors: AxiosError<ResponseError> | Error | ClientError | null;
  readonly userSignedOut: boolean;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  guestPending: false,
  errors: null,
  userSignedOut: false,
};

const userReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {

  if (generateGuestStart.match(action)) {
    return {
      ...state,
      guestPending: true,
    }
  }

  if (
    signUpFailure.match(action) ||
    signInFailure.match(action) || 
    signOutFailure.match(action) ||
    userSignOutFailure.match(action) ||
    requestUserInfoForSignInFailure.match(action) ||
    generateGuestFailure.match(action)
  ) {
    
    return {
      ...state,
      guestPending: false,
      errors: action.payload
    } 
  }

  if (
    signInSuccess.match(action) || 
    requestUserInfoForSignInSuccess.match(action)
  ) {
    return {
      ...state,
      currentUser: action.payload,
      guestPending: false,
      errors: null,
    }
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      errors: null,
    } 
  }

  if (userSignOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      errors: null,
      userSignedOut: true,
    } 
  }

  if (signOutWithError.match(action)) {
    return {
      ...state,
      currentUser: null,
      errors: action.payload
    }
  };

  if (clearErrors.match(action)) {
    return {
      ...state,
      errors: null
    }
  }
  
  return state;

}

export default userReducer;
