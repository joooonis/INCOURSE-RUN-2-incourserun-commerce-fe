import React from 'react';

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

import { LAYOUT } from '@constants/layout';

function Success() {
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
            colorScheme="brand.primary"
            w="100%"
            borderRadius="25px"
            size="sd"
            py="12px"
          >
            시작하기
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

export default Success;
