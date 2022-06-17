import React from 'react';

import { Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function JoinHeader() {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="flex-start"
      position="fixed"
      zIndex="1"
      transition="all 0.3s"
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

export default JoinHeader;
