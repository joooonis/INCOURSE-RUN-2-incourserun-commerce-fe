import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Products from './Products';

function ProductPage() {
  return <Layout content={<Products />} />;
}

export default ProductPage;
