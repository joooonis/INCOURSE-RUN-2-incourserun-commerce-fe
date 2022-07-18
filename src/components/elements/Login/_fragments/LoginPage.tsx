import React from 'react';

import Login from './Login';
import Layout from './LoginLayOut';

function LoginPage() {
  return <Layout content={<Login />} />;
}

export default LoginPage;
