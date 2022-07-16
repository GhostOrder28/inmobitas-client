import { takeLatest, put, all, call, SagaGenerator } from 'typed-redux-saga/macro';
import userActionTypes from './user.types';
import { AxiosError, AxiosResponse } from 'axios';
import { SignInFailureError, SignUpFailureError } from './user.actions';
import {
  signInStart,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  SignUpStart,
  SignInStart,
} from './user.actions';
import createRequest from '../redux-utils/create-request'; 
import { SignInData, UserInfo } from '../../components/user-auth/user-auth.types';
//import { fetchUserInfo, fetchNewUser } from '../requests';

function isResponse(res: AxiosResponse | Error): res is AxiosResponse {
  return (res as AxiosResponse).data !== undefined;
}

export function* signUp ({ payload, http }: SignUpStart) { 
  try {
    const requestNewUser = createRequest(http);
    const res: AxiosResponse = yield* call(requestNewUser, '/signup', payload);
    yield* put(signUpSuccess(res.data));
  } catch (err) {
    yield* put(signUpFailure(err as AxiosError<AxiosResponse<SignUpFailureError>>));
  }
}

export function* signIn ({ payload, http }: SignInStart) {  
  try {   
    const requestSignIn = createRequest(http);
    const res: AxiosResponse = yield* call(requestSignIn, '/signin' , payload);
    yield* put(signInSuccess(res.data));
  } catch (err) {
    yield* put(signInFailure(err as AxiosError<AxiosResponse<SignInFailureError>>));
  }
}

export function* signOut() {
  yield* put(signOutSuccess());
}

export function* signInAfterSignUp ({ payload, http }: SignInStart) {
  try {
    yield* put(signInStart(payload, http));
  } catch (err) {
    yield* put(signInFailure(err as AxiosError<AxiosResponse<SignInFailureError>>));
  }
}

export function* onSignUpStart () {
  yield* takeLatest(userActionTypes.SIGN_UP_START, signUp)
}
export function* onSignInStart () {
  yield* takeLatest(userActionTypes.SIGN_IN_START, signIn)
}
export function* onSignOutStart () {
  yield* takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}
export function* onSignUpSuccess () {
  yield* takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas () {
  yield* all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onSignOutStart),
    call(onSignUpSuccess)
  ])
}
