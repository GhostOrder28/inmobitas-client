import { takeLatest, put, all, call } from 'redux-saga/effects';
import userActionTypes from './user.types';
import axios from 'axios';
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getCurrentUser,
} from '../../firebase/firebase.utils';

function* signUp ({ payload: { names, email, password } }) {
  try {
    const { data } = yield call(axios.post, `http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/signup`, { names, email, password });
    yield put(signUpSuccess(data));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

function* signIn ({ payload: { email, password } }) {
  try {
    const { data } = yield call(axios.post, `http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/signin`, { email, password });
    yield put(signInSuccess(data));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

function* onSignUpStart () {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}
function* onSignInStart () {
  yield takeLatest(userActionTypes.SIGN_IN_START, signIn)
}
function* onSignOutStart () {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}
function* onSignUpSuccess () {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signIn)
}

export default function* userSagas () {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onSignOutStart),
  ])
}
