import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { SERVER_URL } from '@components/elements/urls';
import { findProduct } from '@components/hooks';

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
                          isFreeDelivery={order.totalPrice >= 30000}
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
                <Tab key={index} {...TabStyle} _selected={{ color: '#1A1A1A' }}>
                  {index}
                </Tab>
              );
            })}
        </TabList>
      </Tabs>
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
