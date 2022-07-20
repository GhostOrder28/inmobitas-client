import userActionTypes from './user.types';
import { SignUpData, SignInData } from '../../components/user-auth/user-auth.types'
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ValidationError } from '../redux.types';
import { UserInfo } from '../../components/user-auth/user-auth.types';
import { withMatcher } from '../../utils/utility-functions';
import { createAction, createActionWithDependency, Action, ActionWithPayload, ActionWithDependency } from '../../utils/action-creator'

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

export type SignUpStart = ActionWithDependency<userActionTypes.SIGN_UP_START, SignUpData>;
export type SignUpSuccess = ActionWithDependency<userActionTypes.SIGN_UP_SUCCESS, SignInData>;
export type SignUpFailure = ActionWithPayload<userActionTypes.SIGN_UP_FAILURE, AxiosError<AxiosResponse<SignUpFailureError>>>;
export type SignInStart = ActionWithDependency<userActionTypes.SIGN_IN_START, SignInData>;
export type SignInSuccess = ActionWithPayload<userActionTypes.SIGN_IN_SUCCESS, UserInfo>;
export type SignInFailure = ActionWithPayload<userActionTypes.SIGN_IN_FAILURE, AxiosError<AxiosResponse<SignInFailureError>> | Error>;
export type SignOutStart = Action<userActionTypes.SIGN_OUT_START>;
export type SignOutSuccess = Action<userActionTypes.SIGN_OUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<userActionTypes.SIGN_OUT_FAILURE, Error>;
export type ClearErrors = Action<userActionTypes.CLEAR_ERRORS>;

export const signUpStart = withMatcher((signUpData: SignUpData, http: AxiosInstance): SignUpStart =>
  createActionWithDependency(userActionTypes.SIGN_UP_START, signUpData, http));

export const signUpSuccess = withMatcher((signInData: SignInData, http: AxiosInstance): SignUpSuccess =>
  createActionWithDependency(userActionTypes.SIGN_UP_SUCCESS, signInData, http));

export const signUpFailure = withMatcher((error: AxiosError<AxiosResponse<SignUpFailureError>>): SignUpFailure =>
  createAction(userActionTypes.SIGN_UP_FAILURE, error));

export const signInStart = withMatcher((signInData: SignInData, http: AxiosInstance): SignInStart =>
  createActionWithDependency(userActionTypes.SIGN_IN_START, signInData, http));

export const signInSuccess = withMatcher((userInfo: UserInfo): SignInSuccess =>
  createAction(userActionTypes.SIGN_IN_SUCCESS, userInfo));

export const signInFailure = withMatcher((error: AxiosError<AxiosResponse<SignInFailureError>> | Error): SignInFailure =>
  createAction(userActionTypes.SIGN_IN_FAILURE, error));

export const signOutStart = withMatcher((): SignOutStart =>
  createAction(userActionTypes.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(userActionTypes.SIGN_OUT_SUCCESS));

export const signOutFailure = withMatcher((error: Error): SignOutFailure =>
  createAction(userActionTypes.SIGN_OUT_FAILURE, error));

export const clearErrors = withMatcher((): ClearErrors =>
  createAction(userActionTypes.CLEAR_ERRORS));
