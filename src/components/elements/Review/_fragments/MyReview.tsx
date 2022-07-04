import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react';

function SingleReview() {
  return (
    <VStack spacing={0} pt="23px" pb="25px" w="full">
      <Flex w="full" justify="space-between">
        <Box {...ReviewrStyle}>incourse.run</Box>
        <Box>별점입니다. </Box>
      </Flex>
      <Box {...ReviewDateStyle} w="full">
        2021.03.29
      </Box>
      <Box {...ReviewContentStyle} w="full" pt="17px">
        순해서 아이피부에도 자극없이 사용할 수 있어요
      </Box>
      <HStack spacing="10px" w="full" justify="flex-start" pt="9px">
        <Image
          borderRadius="5px"
          w="80px"
          h="80px"
          src="/images/review/review.png"
        ></Image>
        <Image
          borderRadius="5px"
          w="80px"
          h="80px"
          src="/images/review/review.png"
        ></Image>
        <Image
          borderRadius="5px"
          w="80px"
          h="80px"
          src="/images/review/review.png"
        ></Image>
      </HStack>
    </VStack>
  );
}

function MyReview() {
  return (
    <Box pt="130px" px="16px" pb="50px">
      <Box {...TitleStyle} w="full">
        내 상품 리뷰
      </Box>
      <Box {...CountStyle} pt="80px" pb="30px" w="full">
        총 <span style={{ color: '#FF710B' }}>78</span>건
      </Box>
      <Box w="full" h="30px"></Box>
      <SingleReview />
    </Box>
  );
}

export default MyReview;

const TitleStyle = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const CountStyle = {
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
