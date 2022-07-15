import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Payment from './Payment';

function PaymentPage() {
  return <Layout content={<Payment />} />;
}

export default PaymentPage;
