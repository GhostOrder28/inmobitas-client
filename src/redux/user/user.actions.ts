import userActionTypes from './user.types';
import { SignUpData, SignInData } from '../../components/user-auth/user-auth.types'
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { 
  ValidationError, 
  GenerateGuestError,
  SignUpFailureError,
  SignInFailureError,
  RequestUserInfoFailureError,
} from '../redux.types';
import { UserInfo } from '../../components/user-auth/user-auth.types';
import { withMatcher } from '../../utils/utility-functions';
import { 
  createAction, 
  createActionWithDependencyAndPayload,
  createActionWithDependency,
  Action, 
  ActionWithPayload, 
  ActionWithDependencyAndPayload,
  ActionWithDependency,
} from '../../utils/action-creator'
import { ClientError } from '../../errors/errors.types';


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

export type SignUpStart = ActionWithDependencyAndPayload<userActionTypes.SIGN_UP_START, SignUpData>;
export type SignUpSuccess = ActionWithDependencyAndPayload<userActionTypes.SIGN_UP_SUCCESS, SignInData>;
export type SignUpFailure = ActionWithPayload<userActionTypes.SIGN_UP_FAILURE, AxiosError<AxiosResponse<SignUpFailureError>>>;
export type GenerateGuestStart = ActionWithDependency<userActionTypes.GENERATE_GUEST_START>;
export type GenerateGuestSuccess = ActionWithDependencyAndPayload<userActionTypes.GENERATE_GUEST_SUCCESS, SignInData>;
export type GenerateGuestFailure = ActionWithPayload<userActionTypes.GENERATE_GUEST_FAILURE, AxiosError<AxiosResponse<GenerateGuestError>>>;

export type SignInStart = ActionWithDependencyAndPayload<userActionTypes.SIGN_IN_START, SignInData>;
export type SignInSuccess = ActionWithPayload<userActionTypes.SIGN_IN_SUCCESS, UserInfo>;
export type SignInFailure = ActionWithPayload<userActionTypes.SIGN_IN_FAILURE, AxiosError<AxiosResponse<SignInFailureError>> | Error>;
export type SignInWithGoogleStart = ActionWithDependency<userActionTypes.SIGN_IN_WITH_GOOGLE_START>;

export type SignOutStart = ActionWithDependency<userActionTypes.SIGN_OUT_START>;
export type SignOutSuccess = Action<userActionTypes.SIGN_OUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<userActionTypes.SIGN_OUT_FAILURE, Error>;
export type UserSignOutStart = ActionWithDependency<userActionTypes.USER_SIGN_OUT_START>;
export type UserSignOutSuccess = Action<userActionTypes.USER_SIGN_OUT_SUCCESS>;
export type UserSignOutFailure = ActionWithPayload<userActionTypes.USER_SIGN_OUT_FAILURE, Error>;
export type SignOutWithError = ActionWithPayload<userActionTypes.SIGN_OUT_WITH_ERROR, ClientError>;

export type ClearErrors = Action<userActionTypes.CLEAR_ERRORS>;
export type RequestUserInfoForSignInStart = ActionWithDependency<userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_START>;
export type RequestUserInfoForSignInSuccess = ActionWithPayload<userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_SUCCESS, UserInfo>;
export type RequestUserInfoForSignInFailure = ActionWithPayload<userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_FAILURE, AxiosError<AxiosResponse<SignInFailureError>> | Error>;

export const signUpStart = withMatcher((signUpData: SignUpData, http: AxiosInstance): SignUpStart =>
  createActionWithDependencyAndPayload(userActionTypes.SIGN_UP_START, signUpData, http));

export const signUpSuccess = withMatcher((signInData: SignInData, http: AxiosInstance): SignUpSuccess =>
  createActionWithDependencyAndPayload(userActionTypes.SIGN_UP_SUCCESS, signInData, http));

export const signUpFailure = withMatcher((error: AxiosError<AxiosResponse<SignUpFailureError>>): SignUpFailure =>
  createAction(userActionTypes.SIGN_UP_FAILURE, error));

export const generateGuestStart = withMatcher((http: AxiosInstance): GenerateGuestStart =>
  createActionWithDependency(userActionTypes.GENERATE_GUEST_START, http));

export const generateGuestSuccess = withMatcher((signInData: SignInData, http: AxiosInstance): GenerateGuestSuccess =>
  createActionWithDependencyAndPayload(userActionTypes.GENERATE_GUEST_SUCCESS, signInData, http));

export const generateGuestFailure = withMatcher((error: AxiosError<AxiosResponse<GenerateGuestError>>): GenerateGuestFailure =>
  createAction(userActionTypes.GENERATE_GUEST_FAILURE, error));

export const signInStart = withMatcher((signInData: SignInData, http: AxiosInstance): SignInStart =>
  createActionWithDependencyAndPayload(userActionTypes.SIGN_IN_START, signInData, http));

export const signInSuccess = withMatcher((userInfo: UserInfo): SignInSuccess =>
  createAction(userActionTypes.SIGN_IN_SUCCESS, userInfo));

export const signInFailure = withMatcher((error: AxiosError<AxiosResponse<SignInFailureError>> | Error): SignInFailure =>
  createAction(userActionTypes.SIGN_IN_FAILURE, error));

export const signInWithGoogleStart = withMatcher((http: AxiosInstance): SignInWithGoogleStart =>
  createActionWithDependency(userActionTypes.SIGN_IN_WITH_GOOGLE_START, http));

export const signOutStart = withMatcher((http: AxiosInstance): SignOutStart =>
  createActionWithDependency(userActionTypes.SIGN_OUT_START, http));

export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(userActionTypes.SIGN_OUT_SUCCESS));

export const signOutFailure = withMatcher((error: Error): SignOutFailure =>
  createAction(userActionTypes.SIGN_OUT_FAILURE, error));

export const userSignOutStart = withMatcher((http: AxiosInstance): UserSignOutStart =>
  createActionWithDependency(userActionTypes.USER_SIGN_OUT_START, http));

export const userSignOutSuccess = withMatcher((): UserSignOutSuccess =>
  createAction(userActionTypes.USER_SIGN_OUT_SUCCESS));

export const userSignOutFailure = withMatcher((error: Error): UserSignOutFailure =>
  createAction(userActionTypes.USER_SIGN_OUT_FAILURE, error));

export const signOutWithError = withMatcher((error: ClientError): SignOutWithError =>
  createAction(userActionTypes.SIGN_OUT_WITH_ERROR, error));

export const clearErrors = withMatcher((): ClearErrors =>
  createAction(userActionTypes.CLEAR_ERRORS));

export const requestUserInfoForSignInStart = withMatcher((http: AxiosInstance): RequestUserInfoForSignInStart =>
  createActionWithDependency(userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_START, http));

export const requestUserInfoForSignInSuccess = withMatcher((userInfo: UserInfo): RequestUserInfoForSignInSuccess =>
  createAction(userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_SUCCESS, userInfo));

export const requestUserInfoForSignInFailure = withMatcher((error: AxiosError<AxiosResponse<RequestUserInfoFailureError>>) => 
  createAction(userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_FAILURE, error));
