import React from 'react';

import { Container, Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function Header() {
  return (
    <Container maxW={LAYOUT.SIZE.WIDTH}>
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        position="fixed"
        zIndex="1"
        w="343px"
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

export default Header;
