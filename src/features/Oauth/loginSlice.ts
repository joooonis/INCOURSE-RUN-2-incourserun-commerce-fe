import { createSlice } from '@reduxjs/toolkit';

export interface LoginState {
  isLogin: boolean;
}

const initialState: LoginState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'LOGIN',
  initialState,
  reducers: {
    setIsLogin: (state: LoginState) => {
      state.isLogin = true;
    },
  },
});

export const { setIsLogin } = loginSlice.actions;

export default loginSlice;
