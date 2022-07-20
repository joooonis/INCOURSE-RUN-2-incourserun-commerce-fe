import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import CartPayment from './CartPayment';

function CartPaymentPage() {
  return <Layout content={<CartPayment />} />;
}

export default CartPaymentPage;
