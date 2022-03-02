import { takeLatest, put, all, call } from 'redux-saga/effects';
import userActionTypes from './user.types';
// import {
//   signUpSuccess,
//   signUpFailure,
// } from './user.actions';
import {
  createUserWithEmailAndPassword,
  auth
} from '../../firebase/firebase.utils';

function* signUpWithEmail ({ payload: { email, password } }) {
  try {
    const { user } = yield call(createUserWithEmailAndPassword, auth, email, password);
    console.log(user);
    // yield put(signUpSuccess(user));
  } catch (err) {
    // yield put(signUpFailure(err));
  }
}

function* onSignUpStart () {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUpWithEmail)
}

export default function* userSagas () {
  yield all([
    call(onSignUpStart)
  ])
}
