import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import * as ActionTypes from '../ActionTypes'
import { signupAPI } from '../../common/apis/auth.api'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupUser(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* signupSaga() {
  yield takeEvery(ActionTypes.SIGNUP_REQUEST, signupUser)
}

export function* authsaga () {
    yield all([
        signupSaga()
    ])
}
