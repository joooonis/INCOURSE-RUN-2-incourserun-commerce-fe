import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';

import Pagination from '@components/common/Pagination';
import { OrderModal } from '@components/elements/Modal';
import { dateToString, findProduct } from '@components/hooks';

import { getToken } from '@utils/localStorage/token';

import SingleOrder from './SingleOrder';
import { OrderType, ProductType } from './types';

function Order() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [products, setProducts] = useState<ProductType[]>();
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    instance.get('/v1/users/me/orders').then((res) => {
      setOrders(res.data);
    });
    instance.get('/v1/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <Box pt="130px" px="16px" pb="50px">
        <Box {...TitleStyle} w="full">
          주문내역
        </Box>
        <Box h="80px"></Box>
        {orders &&
          orders.slice(offset, offset + limit).map((order) => {
            if (!order.isCancelled) {
              const date = dateToString(order.createdAt);
              const dateString = date.year + date.month + date.date;
              return (
                <>
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
                          id={orderProduct.id}
                          key={orderProduct.id}
                          createdAt={dateString}
                          product={targeProduct}
                          quantity={orderProduct.quantity}
                          hasReview={orderProduct.hasReview}
                          shippingStatus={orderProduct.shippingStatus}
                          isFreeDelivery={order.totalPrice >= 30000}
                          merchantUid={order.merchantUid}
                        ></SingleOrder>
                      );
                    })}
                  {order.shippingStatus === '결제완료' && (
                    <Flex w="full" pt="10px" pb="21px" justify="flex-end">
                      <Button
                        borderRadius="5px"
                        w="140px"
                        h="40px"
                        p="0px 15px"
                        colorScheme="primary"
                        onClick={onOpen}
                        {...TitleText}
                      >
                        주문취소
                      </Button>
                      <OrderModal
                        isOpen={isOpen}
                        onClose={onClose}
                        merchantUid={order.merchantUid}
                        setOrders={setOrders}
                      />
                    </Flex>
                  )}
                </>
              );
            }
          })}
        <Pagination
          total={orders.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
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

const TabStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.400',
};
