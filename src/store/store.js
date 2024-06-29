// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/userSlice';
import checkoutReducer from './slice/checkoutSlice';
import { combineReducers } from 'redux';
import searchReducer from './slice/searchSlice';
const rootReducer = combineReducers({
    user: userReducer,
    checkout: checkoutReducer,
    search: searchReducer
    // thêm các reducers khác ở đây nếu có
});


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer, // sử dụng persistedReducer ở đây
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['_persist'],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };