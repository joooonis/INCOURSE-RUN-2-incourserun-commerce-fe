import React from 'react';

import Layout from '@components/common/@Layout/layouts/HomeLayout';

import Review from './Review';

function ReviewPage() {
  return <Layout content={<Review />} />;
}

export default ReviewPage;
