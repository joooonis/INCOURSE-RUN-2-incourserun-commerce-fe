import React from 'react';

import { Flex, Image } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function Header() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      zIndex="sticky"
      transition="all 0.3s"
      w="100%"
      h={LAYOUT.HEADER.HEIGHT}
      maxW={LAYOUT.SIZE.WIDTH}
      px={LAYOUT.SIZE.PADDING}
    >
      <Image src="/icons/svg/menu.svg" alt="menu" />
      <Image src="/icons/svg/logo.svg" alt="logo" />
      <Image src="/icons/svg/cart.svg" alt="cart" />
    </Flex>
  );
}

export default Header;
