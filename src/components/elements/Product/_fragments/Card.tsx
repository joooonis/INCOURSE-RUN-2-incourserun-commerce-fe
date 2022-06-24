import React from 'react';

import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

type Hashtag = {
  id: number;
  name: string;
};
interface CardProps {
  name: string;
  capacity: number;
  price: number;
  hashtags?: Hashtag[];
  avgRating?: number;
  reviewCount?: number;
}

function Card({
  name,
  capacity,
  price,
  hashtags,
  avgRating,
  reviewCount,
}: CardProps) {
  return (
    <>
      <Box
        position="relative"
        borderRadius="20px"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
      >
        <Image src="/images/product/card.png" />
        <VStack
          top="100px"
          left="30px"
          position="absolute"
          flexDir="column"
          alignItems="flex-start"
          spacing="9px"
        >
          <Image src="/images/product/logo1.svg" />
          <Image src="/images/product/logo2.svg" />
          <Image src="/images/product/logo3.svg" />
        </VStack>
        <Flex
          flexDir="column"
          alignItems="flex-start"
          px="17px"
          pt="30px"
          pb="20px"
        >
          <Box px="13px">
            <Box {...TitleText}>
              {name}
              <span
                style={{
                  paddingLeft: '5px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: '#757983',
                }}
              >
                {capacity}ml
              </span>
            </Box>
            <Box {...PriceText} pt="10px">
              {price}
              <span
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '29px',
                  color: 'black',
                }}
              >
                원
              </span>
            </Box>
            <Box {...TitleText}>
              {avgRating}
              <span
                style={{
                  paddingLeft: '3px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: '#757983',
                }}
              >
                (리뷰 {reviewCount}개)
              </span>
            </Box>
            <Box {...SubText} pt="25px">
              <HStack spacing="5px">
                {hashtags?.map((hashtag) => {
                  return <Text key={hashtag.id}>#{hashtag.name}</Text>;
                })}
              </HStack>
            </Box>
          </Box>

          <Flex justify="space-between" w="100%" pt="20px" pb="10px">
            <Button
              colorScheme="primary"
              w="150px"
              h="50px"
              borderRadius="25px"
              size="sd"
              py="12px"
            >
              바로구매
            </Button>
            <Button
              variant="outline"
              colorScheme="primary"
              w="150px"
              h="50px"
              borderRadius="25px"
              size="sd"
              py="12px"
            >
              장바구니
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Card;

const TitleText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const PriceText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'primary.500',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.700',
};
