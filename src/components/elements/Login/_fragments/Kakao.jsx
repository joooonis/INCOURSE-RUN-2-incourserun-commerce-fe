import router from 'next/router';
import React, { useEffect } from 'react';

import axios from 'axios';

import { Container, Spinner } from '@chakra-ui/react';

const Kakao = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/social_login`, {
        code: code,
        state: 'kakao',
        redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN}/login/kakao/callback`,
      })
      .then((res) => {
        console.log(res);
        const data = JSON.stringify(res.data);

        if (data) localStorage.setItem('oauth', data);

        const token = res.data.access;
        const refresh = res.data.refresh;
        const isRegister = res.data.isRegister;

        if (token) localStorage.setItem('token', token);
        if (refresh) localStorage.setItem('refresh', refresh);

        if (isRegister) router.push('/');
        else router.replace('/join');
      })
      .catch((err) => {
        console.log('소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
      });
  }, []);

  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Kakao;
