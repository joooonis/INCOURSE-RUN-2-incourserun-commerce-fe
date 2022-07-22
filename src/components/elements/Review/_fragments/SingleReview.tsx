import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react';

import StarRating from '@components/common/StarRating/StarRating';

import { SingleReviewProps } from './types';

function SingleReview({ review }: SingleReviewProps) {
  const year = review.createdAt.slice(0, 4);
  const month = review.createdAt.slice(5, 7);
  const date = review.createdAt.slice(8, 10);
  return (
    <VStack spacing={0} pt="23px" pb="25px" w="full">
      <Flex w="full" justify="space-between">
        <Box {...ReviewrStyle}>{review.reviewerNickname}</Box>
        <StarRating starRating={review.rating} width="10px" />
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

export default SingleReview;

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
