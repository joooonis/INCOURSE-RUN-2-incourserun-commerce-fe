import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Box, VStack } from '@chakra-ui/react';

import { SERVER_URL } from '../../urls';
import Card from './Card';
import Detail from './Detail';

type Hashtag = {
  id: number;
  name: string;
};

type Product = {
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
      <Detail
        name="인코스런 로션"
        capacity={120}
        price={27000}
        avgRating={3}
        reviewCount={125}
        description="순하고 마일드한 안심 처방으로 피부가 민감하고
        연약한 우리 아이를 위한 고보습 로션"
      ></Detail>

      <VStack mx="16px" spacing="30px">
        {products &&
          products.map((product: Product, index) => {
            return (
              <Card
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
