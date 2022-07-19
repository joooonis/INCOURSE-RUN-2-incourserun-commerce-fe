import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { setAuthHeader } from '@apis/_axios/instance';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Main from './Main';
import MainHeader from './MainHeader';

function MainPage() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else {
      setAuthHeader(accessToken);
    }
  }, []);
  return <Layout content={<Main />} />;
}

export default MainPage;
