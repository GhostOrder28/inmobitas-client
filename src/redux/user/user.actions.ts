import userActionTypes from './user.types';
import { SignUpData, SignInData } from '../../components/user-auth/user-auth.types'
import { AxiosError, AxiosResponse } from 'axios';
import { ValidationError } from '../redux.types';
import { UserInfo } from '../../components/user-auth/user-auth.types';
import { createAction } from '../../utils/action-creator';
import { withMatcher } from '../../utils/utility-functions';
import { Action, ActionWithPayload } from '../../utils/action-creator'

export type UserAction = 
  | SignUpStart
  | SignUpSuccess
  | SignUpFailure
  | SignInStart
  | SignInSuccess
  | SignInFailure
  | SignOutStart
  | SignOutSuccess
  | SignOutFailure
  | ClearErrors;

export type SignUpFailureError = { validationErrors: ValidationError[]; } | { duplicateEntityError: string; }
export type SignInFailureError = { validationErrors: ValidationError[]; } | { authErrors: string; }

export type SignUpStart = ActionWithPayload<userActionTypes.SIGN_UP_START, SignUpData>;
export type SignUpSuccess = ActionWithPayload<userActionTypes.SIGN_UP_SUCCESS, SignInData>;
export type SignUpFailure = ActionWithPayload<userActionTypes.SIGN_UP_FAILURE, AxiosError<AxiosResponse<SignUpFailureError>>>;
export type SignInStart = ActionWithPayload<userActionTypes.SIGN_IN_START, SignInData>;
export type SignInSuccess = ActionWithPayload<userActionTypes.SIGN_IN_SUCCESS, UserInfo>;
export type SignInFailure = ActionWithPayload<userActionTypes.SIGN_IN_FAILURE, AxiosError<AxiosResponse<SignInFailureError>> | Error>;
export type SignOutStart = Action<userActionTypes.SIGN_OUT_START>;
export type SignOutSuccess = Action<userActionTypes.SIGN_OUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<userActionTypes.SIGN_OUT_FAILURE, AxiosError<AxiosResponse>>;
export type ClearErrors = Action<userActionTypes.CLEAR_ERRORS>;

export const signUpStart = withMatcher((signUpData: SignUpData): SignUpStart =>
  createAction(userActionTypes.SIGN_UP_START, signUpData));

export const signUpSuccess = withMatcher((signInData: SignInData): SignUpSuccess =>
  createAction(userActionTypes.SIGN_UP_SUCCESS, signInData));

export const signUpFailure = withMatcher((error: AxiosError<AxiosResponse<SignUpFailureError>>): SignUpFailure =>
  createAction(userActionTypes.SIGN_UP_FAILURE, error));

export const signInStart = withMatcher((signInData: SignInData): SignInStart =>
  createAction(userActionTypes.SIGN_IN_START, signInData));

export const signInSuccess = withMatcher((userInfo: UserInfo): SignInSuccess =>
  createAction(userActionTypes.SIGN_IN_SUCCESS, userInfo));

export const signInFailure = withMatcher((error: AxiosError<AxiosResponse<SignInFailureError>> | Error): SignInFailure =>
  createAction(userActionTypes.SIGN_IN_FAILURE, error));

export const signOutStart = withMatcher((): SignOutStart =>
  createAction(userActionTypes.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(userActionTypes.SIGN_OUT_SUCCESS));

export const signOutFailure = withMatcher((error: AxiosError<AxiosResponse>): SignOutFailure =>
  createAction(userActionTypes.SIGN_OUT_FAILURE, error));

export const clearErrors = withMatcher((): ClearErrors =>
  createAction(userActionTypes.CLEAR_ERRORS));
