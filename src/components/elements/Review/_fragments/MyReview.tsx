import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import Pagination from '@components/common/Pagination';

import { getToken } from '@utils/localStorage/token';

import SingleReview from './SingleReview';
import { ReviewType } from './types';

function MyReview() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);

  const [myReviews, setMyReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  useEffect(() => {
    instance.get('/v1/users/me/reviews').then((res) => {
      setMyReviews(res.data);
    });
  }, []);

  return (
    <Box pt="130px" px="16px" pb="50px">
      <Box {...TitleStyle} w="full">
        내 상품 리뷰
      </Box>
      <Box {...ReviewCountStyle} pt="80px" pb="30px" w="full">
        총 <span style={{ color: '#FF710B' }}>{myReviews.length}</span>건
      </Box>
      <Box w="full" h="30px"></Box>
      {myReviews &&
        myReviews.slice(offset, offset + limit).map((review) => {
          return <SingleReview key={review.id} review={review} />;
        })}
      <Pagination
        total={myReviews.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
}

export default MyReview;

const TitleStyle = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const ReviewCountStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const ReviewrStyle = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const ReviewDateStyle = {
  fontSize: '12px',
  lineHeight: '18px',
  color: 'gray.600',
  fontWeight: '400',
};

const ReviewContentStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
