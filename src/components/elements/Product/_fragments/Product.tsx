import React from 'react';

import { Box, VStack } from '@chakra-ui/react';

import { ProductType, useProduct } from '@components/hooks/useProduct';

import Card from './Card';

function Product() {
  const products = useProduct();
  console.log(products);
  return (
    <Box pt="120px" pb="80px">
      <VStack spacing={0}></VStack>
      <VStack mx="16px" spacing="30px">
        {products.products &&
          products.products.map((product: ProductType, index: number) => {
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
