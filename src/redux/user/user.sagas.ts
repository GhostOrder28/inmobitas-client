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
import { fetchUserInfo, fetchNewUser } from '../requests';

function isResponse(res: AxiosResponse | Error): res is AxiosResponse {
  return (res as AxiosResponse).data !== undefined;
}

function* signUp ({ payload: { names, email, password, confirmPassword } }: SignUpStart) {
  try {
    const res = yield* call(fetchNewUser, names, email, password, confirmPassword);
    if (isResponse(res)) {
      yield* put(signUpSuccess({ email, password }));
    } else {
      yield* put(signUpFailure(res));
    }
  } catch (err) {
    yield* put(signUpFailure(err as AxiosError<AxiosResponse<SignUpFailureError>>));
  }
}

function* signIn ({ payload: { email, password } }: SignInStart) {  
  try {   
    const res = yield* call(fetchUserInfo, email, password);
    if (isResponse(res)) {
      yield* put(signInSuccess(res.data));
    } else {
      yield* put(signInFailure(res));
    }
  } catch (err) {
    yield* put(signInFailure(err as Error));
  }
}

function* signOut() {
  try {
    yield* put(signOutSuccess());
  } catch (err) {
    yield* put(signOutFailure(err as AxiosError<AxiosResponse>));
  }
}

function* signInAfterSignUp ({ payload: { email, password } }: SignInStart) {
  try {
    yield* put(signInStart({ email, password }));
  } catch (err) {
    yield* put(signInFailure(err as AxiosError<AxiosResponse<SignInFailureError>>));
  }
}

function* onSignUpStart () {
  yield* takeLatest(userActionTypes.SIGN_UP_START, signUp)
}
function* onSignInStart () {
  yield* takeLatest(userActionTypes.SIGN_IN_START, signIn)
}
function* onSignOutStart () {
  yield* takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}
function* onSignUpSuccess () {
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
