import { configureStore } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { persistStore } from "redux-persist"
import { rootReducer } from "./rootReducer"

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['products']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;