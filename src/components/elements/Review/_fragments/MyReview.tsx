import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import Pagination from '@components/common/Pagination';

import { ReviewType, SingleReviewProps, StarRatingProps } from './types';

function StarRating({ starRating, upStar, downStar }: StarRatingProps) {
  const rendering = () => {
    const result = [];
    for (let i = 0; i < starRating; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star.svg"
          w="10px"
          alt={String(i)}
          onClick={downStar}
        />,
      );
    }
    for (let i = starRating; i < 5; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star_gray.svg"
          w="10px"
          alt={String(i)}
          onClick={upStar}
        />,
      );
    }
    return result;
  };

  return (
    <HStack spacing="6px" justify="center">
      {rendering()}
    </HStack>
  );
}

function SingleReview({ review }: SingleReviewProps) {
  const year = review.createdAt.slice(0, 4);
  const month = review.createdAt.slice(5, 7);
  const date = review.createdAt.slice(8, 10);
  return (
    <VStack spacing={0} pt="23px" pb="25px" w="full">
      <Flex w="full" justify="space-between">
        <Box {...ReviewrStyle}>incourse.run</Box>
        <StarRating starRating={review.rating} />
      </Flex>
      <Box {...ReviewDateStyle} w="full">
        {year}.{month}.{date}
      </Box>
      <Box {...ReviewContentStyle} w="full" pt="17px">
        {review.content}
      </Box>
      <HStack spacing="10px" w="full" justify="flex-start" pt="9px">
        {review.photos.map((photo) => (
          <Image
            key={photo.id}
            borderRadius="5px"
            w="80px"
            h="80px"
            src={photo.img}
          ></Image>
        ))}
      </HStack>
    </VStack>
  );
}

function MyReview() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else {
      setAuthHeader(accessToken);
    }
  }, []);

  const [myReviews, setMyReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  useEffect(() => {
    instance.get('/v1/users/me/reviews').then((res) => {
      setMyReviews(res.data.results);
    });
  }, []);

  return (
    <Box pt="130px" px="16px" pb="50px">
      <Box {...TitleStyle} w="full">
        내 상품 리뷰
      </Box>
      <Box {...ReviewCountStyle} pt="80px" pb="30px" w="full">
        총 <span style={{ color: '#FF710B' }}>{myReviews?.length}</span>건
      </Box>
      <Box w="full" h="30px"></Box>
      {myReviews &&
        myReviews
          .slice(offset, offset + limit)
          .map((review) => <SingleReview key={review.id} review={review} />)}
      <Box w="full" borderBottom="1px solid #F2F3F4"></Box>
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
