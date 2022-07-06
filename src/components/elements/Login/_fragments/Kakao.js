import React from 'react';
import { useEffect } from 'react';

// import { useDispatch } from 'react-redux';
// import { actionCreators as userActions } from '@features/Oauth/kakaologin';
import { kakaoLogin } from '@features/Oauth/kakaologin';

const Kakao = () => {
  // const dispatch = useDispatch();
  // 인가코드

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    kakaoLogin(code);
  }, []);

  return <div>로그인중입니다.</div>;
};

export default Kakao;
