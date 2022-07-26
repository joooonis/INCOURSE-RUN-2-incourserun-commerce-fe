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

import PrimaryButton from '@components/common/Button/Button';

import { LAYOUT } from '@constants/layout';
import { getToken } from '@utils/localStorage/token';

function Success() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
  }, []);
  const gotoMain = () => {
    router.replace('/');
  };
  return (
    <Container maxW="375px">
      <VStack w="full" pt="80px" h="812px" spacing={0}>
        <VStack w="full" spacing={0} alignItems="flex-start">
          <Box {...HeadingText} alignSelf="flex-start">
            회원가입이 <br />
            완료되었습니다.
          </Box>
          <Box {...SubTex} color="gray.600" pt="5px">
            관심사별로 자유롭게 소통해보세요!
          </Box>
        </VStack>
        <Box pt="100px">
          <Image src="/icons/svg/hands-clapping.svg" alt="logo" />
        </Box>
        <Box w="full" pt="237px">
          <PrimaryButton onClick={gotoMain}>시작하기</PrimaryButton>
        </Box>
      </VStack>
    </Container>
  );
}

export default Success;

const HeadingText = {
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: '38px',
};

const SubTex = {
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
};

const ButtonText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
