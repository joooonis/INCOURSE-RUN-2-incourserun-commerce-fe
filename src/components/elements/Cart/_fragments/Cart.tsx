import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';

import { Box, Button, Checkbox, Flex, VStack } from '@chakra-ui/react';

import {
  addItem,
  checkAllItem,
  checkItem,
  setTotal,
  unCheckAllItem,
} from '@features/Item/itemSlice';
import { removeItem } from '@features/Item/itemSlice';

import { SERVER_URL } from '@components/elements/urls';
import { findProduct, priceToString } from '@components/hooks';
import { useRootState } from '@components/hooks/useRootState';

import Item from './Item';
import { ItemType, ProductType } from './types';

function Cart() {
  const [items, setItems] = useState<ItemType[] | null>(null);
  const [products, setProducts] = useState<ProductType[]>();

  const { itemCheckers, total } = useRootState((state) => state.ITEM);

  const router = useRouter();
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(checkAllItem());
    } else dispatch(unCheckAllItem());
  };

  const gotoProduct = () => {
    router.replace('./products');
  };

  const calculateTotalPrice = (products: ProductType[], items: ItemType[]) => {
    if (!products || !items) return;
    else {
      let totalPrice = 0;
      items.forEach((item) => {
        const price = item.quantity * findProduct(products, item.product).price;
        totalPrice += price;
      });
      dispatch(setTotal(totalPrice));
    }
  };

  useEffect(() => {
    const fetchURL = async () => {
      try {
        const res1 = await axios.get(SERVER_URL.LOCAL + '/v1/products');
        const res2 = await axios.get(SERVER_URL.LOCAL + '/v1/carts', {
          params: {
            user: 1, //여기에서 user id 를 수정합니다.
          },
        });

        setProducts(res1.data);
        setItems(res2.data);
        calculateTotalPrice(res1.data, res2.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchURL();
  }, []);

  const incTotal = (price: number, t: number = total) => {
    dispatch(setTotal(t + price));
  };

  const decTotal = (price: number, t: number = total) => {
    dispatch(setTotal(t - price));
  };

  useEffect(() => {
    if (items && products) {
      items.forEach((item: ItemType) => {
        const targeProduct = findProduct(products, item.product);

        dispatch(
          addItem({
            id: item.id,
            price: targeProduct.price,
            quantity: item.quantity,
          }),
        );
      });
    }
  }, [items]);

  const deleteSelectedItem = () => {
    let dec = 0;
    for (const item of itemCheckers.filter((item) => item.checked)) {
      dec += item.quantity * item.price;
    }
    decTotal(dec);

    for (const item of itemCheckers.filter((item) => item.checked)) {
      axios
        .delete(SERVER_URL.LOCAL + '/v1/carts/' + item.id)
        .then((res) => console.log(res));
      dispatch(removeItem(item.id));
    }
  };

  return (
    <Box pt="80px" pb="50px">
      {total !== 0 ? (
        <>
          <Flex
            {...TextStyle}
            px="16px"
            py="11px"
            w="full"
            justify="space-between"
          >
            <Flex>
              <Checkbox
                size="lg"
                colorScheme="primary"
                pr="10px"
                alignSelf="center"
                onChange={onChange}
              ></Checkbox>
              모두선택
            </Flex>
            <Box _hover={{ cursor: 'pointer' }} onClick={deleteSelectedItem}>
              선택삭제
            </Box>
          </Flex>
          <VStack mt="10px" spacing="30px">
            {items &&
              products &&
              items.map((item: ItemType, index) => {
                const targeProduct = findProduct(products, item.product);
                const targetItem = itemCheckers.find((x) => x.id === item.id);
                if (targeProduct && targetItem)
                  return (
                    <Item
                      key={index}
                      product={targeProduct}
                      item={targetItem}
                      incTotal={incTotal}
                      decTotal={decTotal}
                      checkItem={checkItem}
                    ></Item>
                  );
              })}
          </VStack>
          <VStack spacing={0} px="16px" pt="20px" mt="10px" pb="30px">
            <Flex {...TextStyle} w="full" justify="space-between">
              <Box>총 상품금액</Box>
              <Box>{priceToString(total)} 원</Box>
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
                {priceToString(total)} 원
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
          </VStack>
        </>
      ) : (
        <VStack spacing="30px" pt="100px" pb="30px">
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
            onClick={gotoProduct}
          >
            상품보러가기
          </Button>
        </VStack>
      )}
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
