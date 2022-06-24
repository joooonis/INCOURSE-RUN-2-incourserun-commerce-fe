import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Box, VStack } from '@chakra-ui/react';

import { SERVER_URL } from '../../urls';
import Card from './Card';

type Hashtag = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  hashtags?: Hashtag[];
  avgRating?: number;
  reviewCount?: number;
  <T>(arg: T): T;
};

function Product() {
  const [products, setProducts] = useState([]);
  const url = SERVER_URL.PRODUCT + '/v1/products';
  useEffect(() => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Box pt="120px" pb="80px">
      <VStack spacing={0}></VStack>

      <VStack mx="16px" spacing="30px">
        {products &&
          products.map((product: Product, index) => {
            return (
              <Card
                id={product.id}
                key={index}
                name={product.name}
                capacity={product.capacity}
                price={product.price}
                hashtags={product.hashtags}
                avgRating={product.avgRating}
                reviewCount={product.reviewCount}
              ></Card>
            );
          })}
      </VStack>
    </Box>
  );
}

export default Product;
