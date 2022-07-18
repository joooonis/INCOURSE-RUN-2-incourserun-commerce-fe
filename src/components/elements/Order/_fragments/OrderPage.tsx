import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Order from './Order';

function OrderPage() {
  return <Layout content={<Order />} />;
}

export default OrderPage;
