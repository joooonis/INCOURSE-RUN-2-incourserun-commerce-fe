import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import MyReview from './MyReview';

function MyReviewPage() {
  return <Layout content={<MyReview />} />;
}

export default MyReviewPage;
