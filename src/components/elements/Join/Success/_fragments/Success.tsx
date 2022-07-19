import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { setAuthHeader } from '@apis/_axios/instance';

import { LAYOUT } from '@constants/layout';

function Success() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else {
      setAuthHeader(accessToken);
    }
  }, []);

  const gotoProduct = () => {
    router.replace('/products');
  };
  return (
    <Container maxW={LAYOUT.SIZE.WIDTH}>
      <VStack w="100%" py="80px" px="16px" h="812px" justify="space-between">
        <Flex w="100%" direction="column" alignItems="flex-start">
          <Heading size="lg" alignSelf="flex-start">
            회원가입이 <br />
            완료되었습니다.
          </Heading>
          <Text color="gray.600" fontSize="12px">
            관심사별로 자유롭게 소통해보세요
          </Text>
        </Flex>
        <Image src="/icons/svg/hands-clapping.svg" alt="logo" />
        <Box w="100%" py="60px">
          <Button
            colorScheme="primary"
            w="100%"
            borderRadius="25px"
            size="sd"
            py="12px"
            onClick={gotoProduct}
          >
            시작하기
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

export default Success;
