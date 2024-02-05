import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import { wishListReducer } from './slices/wishListSlice';
import { searchReducer } from './slices/searchSlice';
import { cartReducer } from './slices/productsSlice'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)
const persistedwishReducer = persistReducer(persistConfig, wishListReducer)
const persistedSearchReducer = persistReducer(persistConfig, searchReducer)


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    wishList: persistedwishReducer,
    products: persistedReducer,
    searchList: persistedSearchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store)