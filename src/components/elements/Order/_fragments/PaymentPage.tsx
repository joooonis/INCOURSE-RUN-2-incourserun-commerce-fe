import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { setAuthHeader } from '@apis/_axios/instance';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Payment from './Payment';

function PaymentPage() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else {
      setAuthHeader(accessToken);
    }
  }, []);
  return <Layout content={<Payment />} />;
}

export default PaymentPage;
