import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Box, Button, Checkbox, Flex, VStack } from '@chakra-ui/react';

import { SERVER_URL } from '@components/elements/urls';
import { ProductType, useProduct } from '@components/hooks/useProduct';

import Item from './Item';

type Item = {
  id: number;
  user: number;
  product: number;
  quantity: number;
};

function Cart() {
  const [items, setItems] = useState<Item[] | null>(null);
  const products = useProduct();

  const url = SERVER_URL.NEW + '/v1/users/cart';

  useEffect(() => {
    axios
      .get(url, {
        params: {
          user: 1,
        },
      })
      .then((res) => {
        setItems(res.data);
      });
  }, [url]);

  function findItem(products: ProductType[] | undefined, id: number) {
    if (products) return products.find((e) => e.id == id);
  }

  return (
    <Box pt="80px" pb="50px">
      <Flex {...TextStyle} px="16px" py="11px" w="full" justify="space-between">
        <Flex>
          <Checkbox
            size="lg"
            colorScheme="primary"
            pr="10px"
            alignSelf="center"
          ></Checkbox>
          모두선택
        </Flex>
        <Box>선택삭제</Box>
      </Flex>
      <VStack mt="10px" spacing="30px">
        {items &&
          products.products &&
          items.map((item: Item, index) => {
            const myProduct = findItem(products.products, item.id);
            return <Item key={index} product={myProduct} item={item}></Item>;
          })}
      </VStack>
      <VStack spacing={0} px="16px" pt="20px" mt="10px" pb="30px">
        <Flex {...TextStyle} w="full" justify="space-between">
          <Box>총 상품금액</Box>
          <Box>108,000 원</Box>
        </Flex>
        <Flex {...TextStyle} pt="10px" w="full" justify="space-between">
          <Box>총 배송비</Box>
          <Box>0 원</Box>
        </Flex>
        <Flex
          {...TextStyle}
          color="#1A1A1A"
          pt="40px"
          pb="20px"
          w="full"
          justify="space-between"
        >
          <Box>결제금액</Box>
          <Box color="primary.500" fontWeight="700">
            108,000 원
          </Box>
        </Flex>
        <Button
          w="full"
          colorScheme="primary"
          p="0px 15px"
          borderRadius="25px"
          size="lg"
        >
          결제하기
        </Button>
        <VStack spacing="30px">
          <Box
            fontWeight="700"
            fontSize="16px"
            lineHeight="28px"
            textAlign="center"
          >
            장바구니가 비었습니다. <br />
            상품을 추가해보세요!
          </Box>
          <Button
            colorScheme="primary"
            w="180px"
            p="0px 15px"
            borderRadius="25px"
            size="lg"
          >
            상품보러가기
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default Cart;

const TextStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.600',
};
