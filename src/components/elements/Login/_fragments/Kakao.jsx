import router from 'next/router';
import React, { useEffect } from 'react';

import instance from '@apis/_axios/instance';

import { SERVER_URL } from '@components/elements/urls';

const Kakao = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    instance
      .post(SERVER_URL.LOCAL + '/v1/users/social_login', {
        code: code,
        state: 'kakao',
        redirectUri: 'http://172.30.1.17:3000/login/kakao/callback',
      })
      .then((res) => {
        // console.log(res);
        const token = res.data.access;
        const isRegister = res.data.isRegister;

        if (token) {
          localStorage.setItem('token', token);
        }

        if (isRegister) router.replace('/products');
        else router.replace('/join');
      })
      .catch((err) => {
        console.log('소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
      });
  }, []);

  return <div>로그인중입니다.</div>;
};

export default Kakao;
