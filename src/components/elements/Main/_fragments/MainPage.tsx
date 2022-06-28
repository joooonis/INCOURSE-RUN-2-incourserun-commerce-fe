import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Main from './Main';
import MainHeader from './MainHeader';

function MainPage() {
  return <Layout header={<MainHeader />} content={<Main />} />;
}

export default MainPage;
