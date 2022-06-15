import React from 'react';

import LoginLayout from './_fragments/LoginLayout';
import LoginPageContent from './_fragments/LoginPageContent';

function LoginPage() {
  return <LoginLayout content={<LoginPageContent />} />;
}

export default LoginPage;
