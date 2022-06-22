import React from 'react';

import { Box, VStack } from '@chakra-ui/react';

import Card from './Card';
import test from './test.json';

function Product() {
  const json = JSON.stringify(test);
  const my = JSON.parse(json);
  console.log(my);
  return (
    <Box pt="120px" pb="80px">
      <VStack mx="16px" spacing="30px">
        {my.map((product: any) => {
          return (
            <Card
              key={product.id}
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
