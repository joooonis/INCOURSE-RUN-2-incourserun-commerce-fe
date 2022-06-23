import React from 'react';

import { Container, Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function JoinHeader() {
  return (
    <Container maxW={LAYOUT.SIZE.WIDTH}>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="flex-start"
        position="fixed"
        zIndex="1"
        transition="all 0.3s"
        w="343px"
        mx="auto"
        h={LAYOUT.HEADER.HEIGHT}
        bg="white"
      >
        <Image src="/icons/svg/logo-signup.svg" alt="menu" />
      </Flex>
    </Container>
  );
}

export default JoinHeader;
