import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import userActionTypes from "./user.types";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  // actions
  signInStart,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  userSignOutSuccess,
  requestUserInfoForSignInSuccess,
  requestUserInfoForSignInFailure,
  generateGuestSuccess,
  generateGuestFailure,
  // types
  SignUpStart,
  SignInStart,
  SignOutStart,
  UserSignOutStart,
  RequestUserInfoForSignInStart,
  RequestUserInfoForSignInSuccess,
  GenerateGuestStart,
  GenerateGuestSuccess,
} from "./user.actions";
import {
  SignInFailureError,
  SignUpFailureError,
  RequestUserInfoFailureError,
  GenerateGuestUserError,
} from "../redux.types";
import { createGetRequest, createPostRequest } from "../redux-utils/create-request";
import { unsetIsLoading } from "../app/app.actions";

function isResponse(res: AxiosResponse | Error): res is AxiosResponse {
  return (res as AxiosResponse).data !== undefined;
}

export function* signUp ({ payload, http }: SignUpStart) { 
  try {
    const requestNewUser = createPostRequest(http);
    const res: AxiosResponse = yield* call(requestNewUser, "/auth/signup/normal", payload);
    yield* put(signUpSuccess(res.data, http));
  } catch (err) {
    yield* put(signUpFailure(err as AxiosError<AxiosResponse<SignUpFailureError>>));
  }
}

export function* generateGuest ({ http }: GenerateGuestStart) {
  try {
    const requestGuestUser = createGetRequest(http);
    const tzOffset = new Date().getTimezoneOffset()/60;
    const res: AxiosResponse = yield* call(requestGuestUser, `/auth/signup/guest/${tzOffset}`);
    yield* put(generateGuestSuccess(res.data, http));
  } catch (err: any) {
    if (err.response.data.limitReachedError) {
      yield* put(generateGuestFailure(err as AxiosError<AxiosResponse<GenerateGuestUserError>>)); 
    }
    yield* put(generateGuestFailure(err as AxiosError<AxiosResponse<GenerateGuestUserError>>)); 
  }
}

export function* signIn ({ payload, http }: SignInStart) {  
  try {  
    const requestSignIn = createPostRequest(http);
    let userType;
    if (!payload.userType) {
      userType = "normal";
    } else {
      userType = payload.userType;
    }
    const res: AxiosResponse = yield* call(requestSignIn, `/auth/signin/${userType}`, payload);
    yield* put(signInSuccess(res.data));
  } catch (err) {
    yield* put(signInFailure(err as AxiosError<AxiosResponse<SignInFailureError>>));
  }
}

// export function* requestUserInfoForSignIn ({ http }: RequestUserInfoForSignInStart) {
//   try {
//     const requestSignInWithGoogle = createGetRequest(http);
//     const res: AxiosResponse = yield* call(requestSignInWithGoogle, "/auth/getuser");
//     yield* put(requestUserInfoForSignInSuccess(res.data));
//   } catch (err) {
//     yield* put(requestUserInfoForSignInFailure(err as AxiosError<AxiosResponse<RequestUserInfoFailureError>>));
//   }
// }

export function* signOut ({ http }: SignOutStart) {
  try {
    const requestSignOut = createGetRequest(http);
    yield* call(requestSignOut, "/auth/signout");
    yield* put(signOutSuccess());
  } catch (error) {
    console.log(error) 
    yield* put(signOutSuccess());
  }
}

export function* userSignOut ({ http }: UserSignOutStart) {
  try {
    const requestSignOut = createGetRequest(http);
    yield* call(requestSignOut, "/auth/signout");
    yield* put(userSignOutSuccess());
  } catch (error) {
    console.log(error) 
  }
}

export function* signInAfterSignUp ({ payload, http }: SignInStart) {
  try {
    yield* put(unsetIsLoading());
    yield* put(signInStart(payload, http));
  } catch (err) {
    yield* put(signInFailure(err as AxiosError<AxiosResponse<SignInFailureError>>));
  }
}

export function* signInWithUserInfo ({ payload }: RequestUserInfoForSignInSuccess) {
    yield* put(signInSuccess(payload));
}

export function* onSignUpStart () {
  yield* takeLatest(userActionTypes.SIGN_UP_START, signUp)
}
export function* onGenerateGuestStart () {
  yield* takeLatest(userActionTypes.GENERATE_GUEST_START, generateGuest)
}
export function* onSignInStart () {
  yield* takeLatest(userActionTypes.SIGN_IN_START, signIn)
}
export function* onSignOutStart () {
  yield* takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}
export function* onUserSignOutStart () {
  yield* takeLatest(userActionTypes.USER_SIGN_OUT_START, userSignOut)
}
export function* onSignUpSuccess () {
  yield* takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* onGenerateGuestSuccess () {
  yield* takeLatest(userActionTypes.GENERATE_GUEST_SUCCESS, signInAfterSignUp)
}
// export function* onRequestUserInfoForSignInStart () {
//   yield* takeLatest(userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_START, requestUserInfoForSignIn)
// }
export function* onRequestUserInfoForSignInSuccess () {
  yield* takeLatest(userActionTypes.REQUEST_USER_INFO_FOR_SIGN_IN_SUCCESS, signInWithUserInfo)
}

export function* userSagas () {
  yield* all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onSignOutStart),
    call(onUserSignOutStart),
    call(onSignUpSuccess),
    // call(onRequestUserInfoForSignInStart),
    call(onRequestUserInfoForSignInSuccess),
    call(onGenerateGuestStart),
    call(onGenerateGuestSuccess),
  ])
}
