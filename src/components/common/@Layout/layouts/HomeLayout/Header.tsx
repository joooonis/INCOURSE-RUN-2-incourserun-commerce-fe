import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

function Header() {
  const router = useRouter();
  const gotoCart = () => {
    router.push(`/cart`);
  };
  const gotoMain = () => {
    router.push(`/`);
  };
  const gotoMyPage = () => {
    router.push('/mypage');
  };

  const [accessToken, setAccessToken] = useState<string | null>();

  useEffect(() => {
    setAccessToken(localStorage.getItem('token'));
  });

  const gotoProduct = () => {
    router.push('/products');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
          <Image
            src="/icons/svg/menu.svg"
            alt="menu"
            onClick={onOpen}
            _hover={{ cursor: 'pointer' }}
          />
          <Image
            src="/icons/svg/logo.svg"
            alt="logo"
            _hover={{ cursor: 'pointer' }}
            onClick={gotoMain}
          />
          <Image
            src="/icons/svg/cart.svg"
            alt="cart"
            _hover={{ cursor: 'pointer' }}
            onClick={gotoCart}
          />
        </Flex>
      </Container>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent borderRight="62px solid rgba(26, 26, 26, 0.2);">
          <DrawerCloseButton />
          <DrawerBody px="16px" pt="80px">
            <Box {...TitleText}>카테고리</Box>
            <VStack
              {...MenuText}
              spacing="32px"
              pt="46px"
              alignItems="flex-start"
            >
              <Box onClick={gotoMain} _hover={{ cursor: 'pointer' }}>
                홈
              </Box>
              <Box onClick={gotoProduct} _hover={{ cursor: 'pointer' }}>
                상품보기
              </Box>
              <Box onClick={gotoMyPage} _hover={{ cursor: 'pointer' }}>
                마이페이지
              </Box>
            </VStack>

            {accessToken && (
              <Flex {...TitleText} position="absolute" bottom="25px">
                <Image
                  src="/icons/svg/main/logout.svg"
                  alt="logout"
                  _hover={{ cursor: 'pointer' }}
                  mr="4px"
                />
                <Box>로그아웃</Box>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const MenuText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
