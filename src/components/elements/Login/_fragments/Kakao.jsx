import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { setIsLogin } from '@features/Oauth/loginSlice';

import { SERVER_URL } from '@components/elements/urls';

const Kakao = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    axios
      .post(SERVER_URL.LOCAL + '/v1/users/social_login', {
        code: code,
        state: 'kakao',
        redirectUri: 'http://172.30.1.17:3000/login/kakao/callback',
      })
      .then((res) => {
        // console.log(res); // 토큰이 넘어올 것임
        dispatch(setIsLogin()); // 로그인 정보 저장
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem('token', ACCESS_TOKEN); //예시로 로컬에 저장함
        router.replace('/');
      })
      .catch((err) => {
        console.log('소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
      });
  }, []);

  return <div>로그인중입니다.</div>;
};

export default Kakao;
