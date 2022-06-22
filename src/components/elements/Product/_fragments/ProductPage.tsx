import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Product from './Product';

function ProductPage() {
  return <Layout content={<Product />} />;
}

export default ProductPage;
