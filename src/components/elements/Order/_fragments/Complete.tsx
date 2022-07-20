import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { dateToString, findProduct, priceToString } from '@components/hooks';

import { getToken } from '@utils/localStorage/token';

import SinglePayment from './SinglePayment';
import { OrderType, ProductType } from './types';

function Complete() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);

  const id = Number(router.query.id);
  const [order, setOrder] = useState<OrderType>();
  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    if (id && id > 0) {
      instance.get(`${'/v1/orders'}/${id}`).then((res) => {
        setOrder(res.data);
      });
    }

    instance.get('/v1/products').then((res) => setProducts(res.data));
  }, [id]);

  let date;
  if (order) {
    date = dateToString(order.createdAt);
  }

  const goToMain = () => {
    router.push('/');
  };

  const goToOrder = () => {
    router.push('/order');
  };

  return (
    <>
      <VStack spacing={0} alignItems="flex-start" pt="130px" px="16px">
        <Box {...TitleText} w="full" pb="80px">
          결제내역
        </Box>

        {order && date && (
          <Box
            {...DateText}
            w="full"
            py="19px"
            borderTop="1px solid #F9F9F9"
            borderBottom="1px solid #F9F9F9"
          >
            [{date.year} - {date.month} - {date.date}]
          </Box>
        )}

        {order?.orderProducts &&
          products &&
          order.orderProducts.map((orderProduct) => {
            const targeProduct = findProduct(products, orderProduct.product);
            return (
              <SinglePayment
                key={orderProduct.id}
                product={targeProduct}
                quantity={orderProduct.quantity}
                isPaymentCompleted
              ></SinglePayment>
            );
          })}

        <Box w="full" h="10px" bg="gray.100"></Box>
        <Flex {...SubTitleText} w="full" h="55px" alignItems="center">
          배송지 정보
        </Flex>
        <VStack
          {...PayText}
          spacing="10px"
          pt="15px"
          pb="24px"
          justify="flex-start"
          w="full"
        >
          <HStack spacing="10px" w="full">
            <Box w="92px">이름</Box>
            <Box color="gray.700">{order?.shippingName}</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">핸드폰 번호</Box>
            <Box color="gray.700">{order?.shippingPhone}</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">우편번호</Box>
            <Box color="gray.700">{order?.shippingZipcode}</Box>
          </HStack>
          <HStack spacing="10px" w="full" alignItems="flex-start">
            <Box w="92px">주소</Box>
            <Box w="214px" color="gray.700">
              {order?.shippingAddress} {order?.shippingAddressDetail}
            </Box>
          </HStack>
          {order?.shippingRequest && (
            <HStack spacing="10px" w="full">
              <Box w="92px">배송요청사항</Box>
              <Box color="gray.700">{order?.shippingRequest}</Box>
            </HStack>
          )}
        </VStack>
      </VStack>
      <Box w="full" h="10px" bg="gray.100"></Box>
      <VStack spacing={0} px="16px" pb="30px">
        <Flex {...SubTitleText} w="full" h="55px" alignItems="center">
          결제 정보
        </Flex>
        <VStack
          {...PayText}
          spacing="10px"
          pt="15px"
          pb="50px"
          justify="flex-start"
          w="full"
          color="gray.700"
        >
          <HStack w="full" justify="space-between">
            <Box>총 상품금액</Box>
            <Box>{priceToString(order?.totalPrice)} 원</Box>
          </HStack>
          <HStack w="full" justify="space-between">
            <Box>총 배송비</Box>
            <Box>{priceToString(order?.deliveryFee)} 원</Box>
          </HStack>
          <HStack w="full" justify="space-between">
            <Box>결제수단</Box>
            <Box fontWeight="700">{order?.payMethod} 결제</Box>
          </HStack>
          <HStack w="full" pt="35px" justify="space-between">
            <Box color="#1A1A1A">결제금액</Box>
            <Box color="primary.500" fontWeight="700">
              {priceToString(order?.totalPaid)} 원
            </Box>
          </HStack>
        </VStack>
        <Flex justify="space-between" w="full">
          <Button
            {...ButtonText}
            borderRadius="25px"
            colorScheme="primary"
            variant="outline"
            w="165px"
            h="50px"
            py="12px"
            type="submit"
            onClick={goToMain}
          >
            메인화면 이동
          </Button>
          <Button
            {...ButtonText}
            borderRadius="25px"
            colorScheme="primary"
            w="165px"
            h="50px"
            py="12px"
            type="submit"
            onClick={goToOrder}
          >
            주문내역 이동
          </Button>
        </Flex>
      </VStack>
    </>
  );
}

export default Complete;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const DateText = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const SubTitleText = {
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '28px',
};

const PayText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const ButtonText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
