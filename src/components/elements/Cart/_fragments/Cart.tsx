import React from 'react';

import { Box, Checkbox, Flex, VStack } from '@chakra-ui/react';

import Item from './Item';

function Cart() {
  return (
    <Box pt="80px" pb="50px">
      <Flex {...SubText} px="16px" py="11px" justify="space-between">
        <Flex>
          <Checkbox
            size="lg"
            colorScheme="primary"
            pr="10px"
            alignSelf="center"
          ></Checkbox>
          모두선택
        </Flex>
        <Box>선택삭제</Box>
      </Flex>
      <VStack mt="10px" spacing="30px">
        <Item></Item>
      </VStack>
    </Box>
  );
}

export default Cart;

const TitleText = {
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: '38px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.600',
};

const MoreInfoTitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'white',
};

const MoreInfoSubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'white',
};
