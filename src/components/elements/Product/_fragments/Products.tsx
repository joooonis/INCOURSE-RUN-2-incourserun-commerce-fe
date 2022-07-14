import React, { useEffect, useState } from 'react';

import { Box, VStack } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

import { SERVER_URL } from '@components/elements/urls';

import Card from './Card';
import { ProductType } from './types';

function Products() {
  const [products, setProducts] = useState<ProductType[]>();
  const url = SERVER_URL.LOCAL + '/v1/products';

  useEffect(() => {
    instance
      .get('/v1/products', {
        // withCredentials: true,
        // headers: {
        //   access_token: localStorage.getItem('token'),
        // },
      })
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <Box pt="120px" pb="80px">
      <VStack spacing={0}></VStack>
      <VStack px="16px" spacing="30px">
        {products &&
          products.map((product, index) => {
            return <Card product={product} key={index}></Card>;
          })}
      </VStack>
    </Box>
  );
}

export default Products;
