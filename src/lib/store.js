import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from './slices/dataSlice'
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    datareducer: dataReducer
})

const persisted = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persisted,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: { persist: 'persist/PERSIST' }
            }
        })
})

export const persist = persistStore(store)