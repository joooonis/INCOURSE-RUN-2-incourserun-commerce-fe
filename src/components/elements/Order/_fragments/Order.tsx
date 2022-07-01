import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import PrimaryButton from '@components/common/Button/Button';
import { SERVER_URL } from '@components/elements/urls';
import { findProduct, priceToString } from '@components/hooks';

import SingleOrder from './SingleOrder';
import { OrderType, ProductType } from './types';

function Order() {
  const [orders, setOrders] = useState<OrderType[]>();
  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    axios
      .get(SERVER_URL.LOCAL + '/v1/orders', {
        params: {
          user: 1, //여기에서 user id 를 수정합니다.
        },
      })
      .then((res) => setOrders(res.data));

    axios
      .get(SERVER_URL.LOCAL + '/v1/products')
      .then((res) => setProducts(res.data));
  }, []);

  console.log(orders);
  return (
    <>
      <Box pt="130px" px="16px" pb="50px">
        <Box {...TitleStyle} w="full">
          주문내역
        </Box>
        <Box h="80px"></Box>
        <Tabs variant="unstyled" size="sm">
          <TabPanels>
            {orders &&
              orders.map((order) => {
                const dateToString = (createdAt: string) => {
                  const d = new Date(createdAt);
                  const year = String(d.getFullYear());
                  let month = String(d.getMonth());
                  let date = String(d.getDate());

                  if (Number(month) < 10) {
                    month = '0' + month;
                  }

                  if (Number(date) < 10) {
                    date = '0' + date;
                  }
                  return { year, month, date };
                };
                const date = dateToString(order.createdAt);
                const dateString = date.year + date.month + date.date;
                return (
                  <TabPanel key={order.id}>
                    <Box {...TitleText} w="full" py="19px">
                      [{date.year} - {date.month} - {date.date}]
                    </Box>
                    {order.orderProducts &&
                      products &&
                      order.orderProducts.map((orderProduct) => {
                        const targeProduct = findProduct(
                          products,
                          orderProduct.product,
                        );
                        return (
                          <SingleOrder
                            key={orderProduct.id}
                            createdAt={dateString}
                            product={targeProduct}
                            quantity={orderProduct.quantity}
                            hasReview={orderProduct.hasReview}
                            shippingStatus={orderProduct.shippingStatus}
                            isFreeDelivery={order.totalAmount >= 30000}
                          ></SingleOrder>
                        );
                      })}
                  </TabPanel>
                );
              })}
          </TabPanels>
          <TabList
            py="30px"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {orders &&
              orders.map((order, index) => {
                return (
                  <Tab
                    key={index}
                    {...TabStyle}
                    _selected={{ color: '#1A1A1A' }}
                  >
                    {index}
                  </Tab>
                );
              })}
          </TabList>
        </Tabs>
      </Box>
      <Box pt="130px" px="16px" pb="50px">
        <Box {...TitleStyle} w="full">
          리뷰작성
        </Box>
        <Box h="80px"></Box>
        <Box {...TitleText} w="full" py="19px">
          [2021 - 04 - 01]
        </Box>
        <Flex py="10px" justify="space-between" alignItems="center">
          <Flex>
            <Image
              src="/images/order/product.png"
              w="60px"
              h="60px"
              mr="10px"
            ></Image>
            <VStack spacing={0} alignItems="flex-start">
              <Box {...TitleText}>샴푸 & 바디</Box>
              <Box {...SubText}>샴푸 & 바디 | 120ml</Box>
              <Box {...TitleText} color="primary.500">
                {priceToString(27000)}원 / 1개
              </Box>
            </VStack>
          </Flex>
          <VStack spacing={0} alignItems="flex-end">
            <Box {...TitleText} color="primary.500">
              결제완료
            </Box>
            <Box {...SubText} color="#1A1A1A">
              배송비 2,500원
            </Box>
          </VStack>
        </Flex>
        <Box w="full" bg="gray.100" my="20px" h="10px"></Box>
        <VStack spacing={0} align="flex-start">
          <Box {...InputTitleStyle} py="20px">
            별점
          </Box>
          <HStack spacing="12px" w="full" py="28px" justify="center">
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star1" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star2" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star3" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star4" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star5" />
          </HStack>
          <Box {...InputTitleStyle} pt="40px" pb="20px">
            내용
          </Box>
          <Textarea
            variant="flushed"
            placeholder="내용을 작성하세요."
            _focus={{ borderBottom: '2px solid #4A4D55' }}
            rows={10}
            resize="none"
          />
          <Box {...InputTitleStyle} pt="20px">
            사진첨부 (0/3)
          </Box>
          <HStack spacing="20px" pt="30px" justify="flex-start">
            <Box
              w="80px"
              h="80px"
              border="2px dashed #CBCED6"
              borderRadius="5px"
              position="relative"
            >
              <Box
                _before={{
                  content: '""',
                  display: 'block',
                  width: '2px',
                  height: '18px',
                  backgroundColor: '#CBCED6',
                  borderRadius: '2px',
                  position: 'absolute',
                  top: '29px',
                  left: '37px',
                }}
                _after={{
                  content: '""',
                  display: 'block',
                  height: '2px',
                  width: '18px',
                  backgroundColor: '#CBCED6',
                  borderRadius: '2px',
                  position: 'absolute',
                  top: '37px',
                  left: '29px',
                }}
                _hover={{ cursor: 'pointer' }}
              ></Box>
            </Box>
            <Box
              w="80px"
              h="80px"
              border="2px dashed #CBCED6"
              borderRadius="5px"
            ></Box>
            <Box
              w="80px"
              h="80px"
              border="2px dashed #CBCED6"
              borderRadius="5px"
            ></Box>
          </HStack>

          <Input type="file" display="hidden"></Input>
          <PrimaryButton>작성하기</PrimaryButton>
        </VStack>
      </Box>
    </>
  );
}

export default Order;

const TitleStyle = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const TitleText = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: 'gray.700',
};

const TabStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.400',
};

const InputTitleStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
