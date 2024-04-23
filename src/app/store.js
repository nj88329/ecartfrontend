import { configureStore } from '@reduxjs/toolkit';

import { productApi } from '../services/productApi';
import  cartReducer from '../features/cartSlice';


export const store = configureStore({
  reducer: {
     [ productApi.reducerPath ] : productApi.reducer,
    cart : cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( productApi.middleware ),
})

