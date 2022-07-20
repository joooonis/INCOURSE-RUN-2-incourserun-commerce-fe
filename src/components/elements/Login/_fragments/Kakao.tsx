import router from 'next/router';
import React, { useEffect } from 'react';

// import axios from 'axios';
import { Container, Spinner } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { setToken } from '@utils/localStorage/token';
import { Token } from '@utils/localStorage/token';

const Kakao = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    instance
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/social_login`, {
        code: code,
        state: 'kakao',
        redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN}/login/kakao/callback`,
      })
      .then((res) => {
        console.log(res);
        const token: Token = res.data;

        if (token) setToken(token);
        if (token.access) setAuthHeader(token.access);

        if (token.isRegister) router.push('/');
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
