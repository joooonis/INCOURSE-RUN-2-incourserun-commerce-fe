import { useRouter } from 'next/router';
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

import priceToString from '@components/hooks/priceToString';

import { ProductType } from './types';

interface CardProps {
  product: ProductType;
}

function Card({ product }: CardProps) {
  const router = useRouter();
  const gotoDetail = () => {
    router.replace(`products/${product.id}`);
  };
  return (
    <Box
      position="relative"
      borderRadius="20px"
      boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
      onClick={gotoDetail}
      _hover={{ cursor: 'pointer' }}
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
            {product.name}
            <span
              style={{
                paddingLeft: '5px',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '28px',
                color: '#757983',
              }}
            >
              {product.capacity}ml
            </span>
          </Box>
          <Box {...PriceText} pt="10px">
            {priceToString(product.price)}
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
          {product.avgRating.toFixed(1) !== '0.0' && (
            <Flex alignItems="center" {...TitleText}>
              <Image
                src="/icons/svg/product/star.svg"
                w="10px"
                h="10px"
                alt="star"
                mr="8px"
              />
              {product.avgRating.toFixed(1)}
              <span
                style={{
                  paddingLeft: '3px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: '#757983',
                }}
              >
                (리뷰 {product.reviewCount}개)
              </span>
            </Flex>
          )}

          <Box {...SubText} pt="25px">
            <HStack spacing="5px">
              {product.hashtags?.map((hashtag) => {
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
