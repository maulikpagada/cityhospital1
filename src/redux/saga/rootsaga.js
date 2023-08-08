import { authsaga } from "./auth.saga";
import {  all } from 'redux-saga/effects'


export function* rootsaga () {
    yield all([
        authsaga()
    ])
}