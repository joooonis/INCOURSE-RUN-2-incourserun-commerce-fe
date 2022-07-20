import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';

import Pagination from '@components/common/Pagination';
import { dateToString, findProduct } from '@components/hooks';

import SingleOrder from './SingleOrder';
import { OrderType, ProductType } from './types';

function Order() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else setAuthHeader(accessToken);
  }, []);

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [products, setProducts] = useState<ProductType[]>();
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  useEffect(() => {
    instance.get('/v1/users/me/orders').then((res) => setOrders(res.data));
    instance.get('/v1/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <Box pt="130px" px="16px" pb="50px">
      <Box {...TitleStyle} w="full">
        주문내역
      </Box>
      <Box h="80px"></Box>
      {orders &&
        orders.slice(offset, offset + limit).map((order) => {
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
            </>
          );
        })}
      <Pagination
        total={orders.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Box>
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
