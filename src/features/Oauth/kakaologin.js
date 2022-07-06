import router from 'next/router';

import axios from 'axios';

import { SERVER_URL } from '@components/elements/urls';

// import { createAction } from '@reduxjs/toolkit';

// const SET_USER = 'SET_USER';
// // 액션 생성
// const setUser = createAction(SET_USER, (user) => ({ user }));
// // 초기값
// const initialState = {
//   user: null,
//   isLogin: false,
// };

export const kakaoLogin = (code) => {
  axios
    .post(SERVER_URL.LOCAL + '/v1/users/social_login', {
      code: code,
      state: 'kakao',
      redirectUri: 'http://172.30.1.17:3000/login/kakao/callback',
    })
    .then((res) => {
      console.log(res); // 토큰이 넘어올 것임

      const ACCESS_TOKEN = res.data.accessToken;

      localStorage.setItem('token', ACCESS_TOKEN); //예시로 로컬에 저장함
      router.replace('/');
    })
    .catch((err) => {
      console.log('소셜로그인 에러', err);
      window.alert('로그인에 실패하였습니다.');
      // router.replace('/');
    });
};

// export default handleActions(
//   {
//     [SET_USER]: (state, action) =>
//       produce(state, (draft) => {
//         draft.user = action.payload.user;
//         draft.isLogin = true;
//       }),
//   },
//   initialState,
// );

// const actionCreators = {
//   setUser,
//   kakaoLogin,
// };

// export { actionCreators };
