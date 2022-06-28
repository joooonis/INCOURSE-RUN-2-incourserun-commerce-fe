import React from 'react';

import { Container, Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function MainHeader() {
  return (
    <Container px={0} maxW={LAYOUT.SIZE.WIDTH}>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        w="375px"
        px="16px"
        position="fixed"
        zIndex={999}
        transition="all 0.3s"
        h={LAYOUT.HEADER.HEIGHT}
      >
        <Image src="/icons/svg/menu.svg" alt="menu" />
        <Image src="/icons/svg/logo.svg" alt="logo" />
        <Image src="/icons/svg/cart.svg" alt="cart" />
      </Flex>
    </Container>
  );
}

export default MainHeader;
