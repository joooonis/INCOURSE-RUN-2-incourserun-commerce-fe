import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, VStack } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

import Card from './Card';
import { ProductType } from './types';

function Products() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);

  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    instance.get('/v1/products').then((res) => setProducts(res.data));
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
