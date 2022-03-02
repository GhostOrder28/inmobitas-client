import { takeLatest, put, all, call } from 'redux-saga/effects';
import userActionTypes from './user.types';
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

function* getSnapshotFromUserAuth(userAuth) {
  const { email } = userAuth;
  try {
    // const userRef = yield call(createUserProfileDocument, userAuth);
    // const userSnapshot = yield getDoc(userRef);
    // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    yield put(signInSuccess(email))
  } catch (err) {
    yield put(signInFailure(err))
  }
}

function* signUpWithEmail ({ payload: { email, password } }) {
  try {
    const { user } = yield call(createUserWithEmailAndPassword, auth, email, password);
    yield put(signUpSuccess(user));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

function* signInWithEmail ({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInWithEmailAndPassword, auth, email, password);
    yield getSnapshotFromUserAuth(user)
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

function* onCheckUserSession () {
  try {
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
  } catch (err) {
    yield put(signInFailure(err));
  }
}

// function* signInAfterSignUp ({ payload: { user, additionalData } }) {
//   yield call(getSnapshotFromUserAuth, user, additionalData)
// }

function* onSignUpStart () {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUpWithEmail)
}
function* onSignInStart () {
  yield takeLatest(userActionTypes.SIGN_IN_START, signInWithEmail)
}
function* onSignOutStart () {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}
function* onSignUpSuccess () {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, getSnapshotFromUserAuth)
}
function* onCheckAuth () {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, onCheckUserSession)
}

export default function* userSagas () {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onSignOutStart),
    call(onCheckAuth),
  ])
}
