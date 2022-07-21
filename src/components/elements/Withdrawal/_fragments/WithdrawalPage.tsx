import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Withdrawal from './Withdrawal';

function WithdrawalPage() {
  return <Layout content={<Withdrawal />} />;
}

export default WithdrawalPage;
