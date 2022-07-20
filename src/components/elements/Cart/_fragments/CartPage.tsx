import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Cart from './Cart';

function CartPage() {
  return <Layout content={<Cart />} />;
}

export default CartPage;
