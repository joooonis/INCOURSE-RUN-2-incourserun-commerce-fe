import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Detail from './Detail';

function DetailPage() {
  return <Layout content={<Detail />} />;
}

export default DetailPage;
