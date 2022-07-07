import counterSlice from '@features/Count/counterSlice';

import { configureStore } from '@reduxjs/toolkit';

import loginSlice from './Oauth/loginSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
      [loginSlice.name]: loginSlice.reducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
