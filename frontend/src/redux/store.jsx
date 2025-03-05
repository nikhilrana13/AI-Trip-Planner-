import { configureStore } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";

import storageSession from "redux-persist/es/storage/session"
import userReducer from "./UserSlice";

const persistConfig = { key: "auth", storage: storageSession };
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer:{
        user:persistedReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export const persistor = persistStore(store)
