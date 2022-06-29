import React, { useState } from 'react';

import axios from 'axios';

import { Box, Checkbox, Flex, Image, Input, VStack } from '@chakra-ui/react';

import { SERVER_URL } from '@components/elements/urls';
import priceToString from '@components/hooks/priceToString';

import { ItemType, ProductType } from './types';

interface ItemPropsType {
  product: ProductType;
  item: ItemType;
  incTotal: Function;
  decTotal: Function;
}

export function Item({ product, item, incTotal, decTotal }: ItemPropsType) {
  const [quantity, setQunatity] = useState(item.quantity);
  const [sum, setSum] = useState(item.quantity * product.price);
  const url = SERVER_URL.LOCAL + '/v1/users/cart/2';

  const decQuantity = () => {
    if (quantity > 0) {
      setQunatity((quantity: number) => quantity - 1);
      setSum((quantity - 1) * product.price);
      decTotal(product.price);
      axios
        .patch(url, {
          quantity: quantity,
        })
        .then((res) => console.log('성공', res.data));
    }
  };

  const incQuantity = () => {
    if (quantity < 10) {
      setQunatity((quantity: number) => quantity + 1);
      setSum((quantity + 1) * product.price);
      incTotal(product.price);
      axios
        .patch(url, {
          quantity: quantity,
        })
        .then((res) => console.log('성공', res.data));
    }
  };

  return (
    <VStack
      w="full"
      pl="46px"
      pr="16px"
      spacing={0}
      pt="20px"
      pb="20.5px"
      position="relative"
    >
      <Flex w="full" justify="flex-start">
        <Image w="90px" h="90px" src="/images/cart/product.png" />
        <VStack pl="10px" spacing={0} alignItems="flex-start">
          <Box {...TitleText}>{product.name}</Box>
          <Box {...SubText}>
            {product.name} | {product.capacity}ml
          </Box>
          <Box {...TitleText} color="primary.500">
            {priceToString(product.price)}원
          </Box>
        </VStack>
      </Flex>
      <Checkbox
        size="lg"
        colorScheme="primary"
        position="absolute"
        left="16px"
        top="20px"
      ></Checkbox>
      <Box
        position="absolute"
        top="25px"
        right="40px"
        _before={{
          position: 'absolute',
          left: '15px',
          content: '""',
          height: '15px',
          width: '1.5px',
          backgroundColor: '#1A1A1A',
          transform: 'rotate(45deg)',
          borderRadius: '5px',
        }}
        _after={{
          position: 'absolute',
          left: '15px',
          content: '""',
          height: '15px',
          width: '1.5px',
          backgroundColor: '#1A1A1A',
          transform: 'rotate(-45deg)',
          borderRadius: '5px',
        }}
      ></Box>
      <VStack
        alignItems="flex-start"
        mt="15px"
        p="10px"
        w="full"
        bg="gray.200"
        borderRadius="5px"
      >
        <Box {...SubText}>{product.name}</Box>
        <Flex justify="space-between" w="full" mt="4px">
          <Flex h="25px" alignSelf="center">
            <Box
              position="relative"
              bg="white"
              border="1px solid #EAECF0"
              borderRadius="5px 0px 0px 5px"
              p={0}
              w="25px"
              h="25px"
              _after={{
                content: '""',
                display: 'block',
                height: '1px',
                width: '9px',
                backgroundColor: '#4A4D55',
                position: 'absolute',
                top: '11px',
                left: '7px',
              }}
              _hover={{ cursor: 'pointer' }}
              onClick={decQuantity}
            ></Box>
            <Flex
              w="23px"
              h="full"
              borderTop="1px solid #EAECF0"
              borderBottom="1px solid #EAECF0"
            >
              <Input
                w="full"
                h="full"
                border="none"
                fontSize="12px"
                textAlign="center"
                color="gray.800"
                p={0}
                bg="white"
                value={quantity}
                readOnly
              ></Input>
            </Flex>
            <Box
              position="relative"
              bg="white"
              border="1px solid #EAECF0"
              borderRadius="0px 5px 5px 0px"
              w="25px"
              h="25px"
              p={0}
              _before={{
                content: '""',
                display: 'block',
                width: '1px',
                height: '9px',
                backgroundColor: '#4A4D55',
                position: 'absolute',
                top: '7px',
                left: '11px',
              }}
              _after={{
                content: '""',
                display: 'block',
                height: '1px',
                width: '9px',
                backgroundColor: '#4A4D55',
                position: 'absolute',
                top: '11px',
                left: '7px',
              }}
              onClick={incQuantity}
              _hover={{ cursor: 'pointer' }}
            ></Box>
          </Flex>
          <Flex {...TitleText} color="gray.600" alignItems="center">
            {priceToString(product.price)}원
          </Flex>
        </Flex>
      </VStack>
      <Flex justify="space-between" w="full" pt="15px">
        <Box {...SubText} color="black">
          배송비 무료
        </Box>
        <Box {...PriceText}>{priceToString(sum)}원</Box>
      </Flex>
    </VStack>
  );
}

const TitleText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const PriceText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.600',
};
