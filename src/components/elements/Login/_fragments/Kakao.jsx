import router from 'next/router';
import React, { useEffect } from 'react';

import { Container, Spinner } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

const Kakao = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    instance
      .post('/v1/users/social_login', {
        code: code,
        state: 'kakao',
        redirectUri: 'http://incourserun.cf/login/kakao/callback',
      })
      .then((res) => {
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

  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Kakao;
