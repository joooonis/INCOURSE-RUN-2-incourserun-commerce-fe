import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import My from './My';

function MyPage() {
  return <Layout content={<My />} />;
}

export default MyPage;
