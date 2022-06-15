import React from 'react';

import { Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function LoginHeader() {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="flex-start"
      position="fixed"
      zIndex="1"
      transition="all 0.3s"
      // border="1px solid black"
      w="100%"
      mx="auto"
      h={LAYOUT.HEADER.HEIGHT}
      px={LAYOUT.SIZE.PADDING}
      bg="white"
    >
      <Image src="/icons/svg/logo-signup.svg" alt="menu" />
    </Flex>
  );
}

export default LoginHeader;
