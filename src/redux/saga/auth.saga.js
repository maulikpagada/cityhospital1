import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import * as ActionTypes from '../ActionTypes'
import { forgetAPI, loginAPI, logoutAPI, signupAPI } from '../../common/apis/auth.api'
import { setAlert } from '../slice/alertSlice'
import { authError, emailverfication, loggedIn, loggedOut } from '../action/auth.action'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupUser(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    yield put(emailverfication());
    yield put(setAlert({ text: user.message, color: 'success' }))
  } catch (e) {
    yield put(authError(e.message));
    yield put(setAlert({ text: e.message, color: 'error' }))
  }
}

function* loginUser(action) {
  try {
    console.log(action);
    const user = yield call(loginAPI, action.payload.data)
    action.payload.callback("/");
    yield put(loggedIn(user.user))
    yield put(setAlert({ text: user.message, color: 'success' }))
  } catch (e) {
    yield put(authError(e.message));
    yield put(setAlert({ text: e.message, color: 'error' }))
  }
}

function* forgetUser(action) {
  try {
    const user = yield call(forgetAPI, action.payload)
    yield put(setAlert({ text: user.message, color: 'success' }))
    console.log(user);
  } catch (e) {
    yield put(authError(e.message));
    yield put(setAlert({ text: e.message, color: 'error' }))
  }
}

function* logoutUser(action) {
  try {
    const user = yield call(logoutAPI)
    yield put(loggedOut())
    yield put(setAlert({ text: user.message, color: 'success' }))
  } catch (e) {
    yield put(authError(e.message));
    yield put(setAlert({ text: e.message, color: 'error' }))
  }
}

function* signupSaga() {
  yield takeEvery(ActionTypes.SIGNUP_REQUEST, signupUser)
}

function* loginSaga() {
  yield takeEvery(ActionTypes.LOGIN_REQUEST, loginUser)
}

function* forgetSaga() {
  yield takeEvery(ActionTypes.FORGET_REQUEST, forgetUser)
}

function* logoutSaga() {
  yield takeEvery(ActionTypes.LOGOUT_REQUEST, logoutUser)
}

export function* authsaga() {
  yield all([
    signupSaga(),
    loginSaga(),
    forgetSaga(),
    logoutSaga()
  ])
}
