import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Box, Checkbox, Flex, VStack } from '@chakra-ui/react';

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

  const url = SERVER_URL.USER + '/v1/users/cart';

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
      <Flex {...SubText} px="16px" py="11px" justify="space-between">
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
            return (
              <Item
                key={index}
                product={myProduct}
                quantity={item.quantity}
              ></Item>
            );
          })}
      </VStack>
    </Box>
  );
}

export default Cart;

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.600',
};
