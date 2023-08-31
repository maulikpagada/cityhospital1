import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga'
import { rootsaga } from "./saga/rootsaga"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['medicine', 'cart', 'item', 'auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middleweres = [thunk, sagaMiddleware]

const configureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(...middleweres))

    sagaMiddleware.run(rootsaga)


    return store;
}

export let store = configureStore()
export let persistor = persistStore(store)