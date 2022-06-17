import React from 'react';

import Main from './Main';
import Layout from './MainLayout';

function MainPage() {
  return <Layout content={<Main />} />;
}

export default MainPage;
