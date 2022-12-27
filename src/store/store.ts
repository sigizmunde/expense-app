import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth/authSlice';
import { dataSlice } from './data/dataSlice';
import { authReconnectMiddleware } from './auth/authReconnectMiddleware';
import { authGetUserMiddleware } from './auth/authGetUserMiddleware';
import { dataGetCategoriesMiddleware } from './data/dataGetCategoriesMiddleware';
import { dataGetTransactionsMiddleware } from './data/dataGetTransactionsMiddleware';
import { dataGetTotalInfoMiddleware } from './data/dataGetTotalInfoMiddleware';
import { uixSlice } from './uix/uixSlice';

const persistConfig = {
  key: 'expense_app',
  storage,
  whitelist: ['refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  data: dataSlice.reducer,
  uix: uixSlice.reducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authReconnectMiddleware,
      authGetUserMiddleware,
      dataGetCategoriesMiddleware,
      dataGetTransactionsMiddleware,
      dataGetTotalInfoMiddleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
