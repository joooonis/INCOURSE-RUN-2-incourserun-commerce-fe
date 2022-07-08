import { Box, Flex, Image, VStack } from '@chakra-ui/react';

import priceToString from '@components/hooks/priceToString';

import { SinglePaymentProps } from './types';

function SinglePayment({ id, product, quantity }: SinglePaymentProps) {
  return (
    <>
      <Flex
        w="full"
        py="10px"
        justify="space-between"
        alignItems="center"
        borderTop="1px solid #F2F3F4"
        borderBottom="1px solid #F2F3F4"
      >
        <Flex>
          <Image
            src="/images/order/product.png"
            w="60px"
            h="60px"
            mr="10px"
          ></Image>
          <VStack spacing={0} alignItems="flex-start">
            <Box {...TitleText}>{product.name}</Box>
            <Box {...SubText}>
              {product.name} | {product.capacity}ml
            </Box>
            <Box {...TitleText} color="primary.500">
              {priceToString(product.price * quantity)}원 / {quantity}개
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
}

export default SinglePayment;

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
