import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { setAuthHeader } from '@apis/_axios/instance';

import Login from './Login';
import Layout from './LoginLayOut';

function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      setAuthHeader(accessToken);
      router.replace('/');
    }
  }, []);
  return <Layout content={<Login />} />;
}

export default LoginPage;
