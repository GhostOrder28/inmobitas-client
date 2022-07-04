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
  clearErrors,
} from './user.actions'

export type ResponseError = { [ Property in UserError ]: ValidationError[] | string };

export type UserState = {
  readonly currentUser: UserInfo | null;
  readonly errors: AxiosError<ResponseError> | Error | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  errors: null,
};

const userReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {

  if (signUpFailure.match(action) || signInFailure.match(action) || signOutFailure.match(action)) {
    
    return {
      ...state,
      errors: action.payload
    } 
  }

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
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

  if (clearErrors.match(action)) {
    return {
      ...state,
      errors: null
    }
  }
  
  return state;

}

export default userReducer;
