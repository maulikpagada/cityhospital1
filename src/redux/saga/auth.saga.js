import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import * as ActionTypes from '../ActionTypes'
import { forgetAPI, loginAPI, signupAPI } from '../../common/apis/auth.api'
import { setAlert } from '../slice/alertSlice'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupUser(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    yield put(setAlert({ text: user.message, color: 'success' }))
    console.log(user);
  } catch (e) {
    yield put(setAlert({ text: e.message, color: 'error' }))
    console.log(e);
  }
}

function* loginUser(action) {
  try {
    const user = yield call(loginAPI, action.payload)
    yield put(setAlert({ text: user.message, color: 'success' }))
    console.log(user);
  } catch (e) {
    yield put(setAlert({ text: e.message, color: 'error' }))
    console.log(e);
  }
}

function* forgetUser(action) {
  try {
    const user = yield call(forgetAPI, action.payload)
    yield put(setAlert({ text: user.message, color: 'success' }))
    console.log(user);
  } catch (e) {
    yield put(setAlert({ text: e.message, color: 'error' }))
    console.log(e);
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

export function* authsaga() {
  yield all([
    signupSaga(),
    loginSaga(),
    forgetSaga()
  ])
}
