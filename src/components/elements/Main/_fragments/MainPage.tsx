import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Main from './Main';

function MainPage() {
  return <Layout content={<Main />} />;
}

export default MainPage;
