import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['medicine', 'cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const configureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))

    let persistor = persistStore(store)
    return { store, persistor }
}