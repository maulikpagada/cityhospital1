import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import * as ActionTypes from '../ActionTypes'
import { forgetAPI, loginAPI, signupAPI } from '../../common/apis/auth.api'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupUser(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    console.log(user);
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* loginUser(action) {
  try {
    const user = yield call(loginAPI, action.payload)
    console.log(user);
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* forgetUser(action) {
  try {
    const user = yield call(forgetAPI, action.payload)
    console.log(user);
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
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
