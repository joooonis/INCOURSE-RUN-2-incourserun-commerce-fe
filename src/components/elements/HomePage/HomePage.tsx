import { useRouter } from 'next/dist/client/router';
import React from 'react';

import Layout from '@components/common/@Layout/layouts/Layout';

import { ROUTES } from '@constants/routes';

import HomePageContent from './_fragments/HomePageContent';

function HomePage() {
  const router = useRouter();

  // For: Redirect To Starter Docs Page (나중에 꼭 지워주세요)
  React.useEffect(() => {
    router.push(ROUTES.HOME);
  }, [router]);

  return <Layout content={<HomePageContent />} />;
}

export default HomePage;
