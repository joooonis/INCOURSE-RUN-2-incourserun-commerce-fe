import React from 'react';

import { Box, Image, VStack } from '@chakra-ui/react';

import SocialButton from '@components/common/SocialButton';

function Login() {
  return (
    <VStack
      w="100%"
      py="50px"
      bg="primary.500"
      h="812px"
      justify="space-between"
    >
      <Box></Box>
      <Image src="/icons/svg/logo-login.svg" alt="logo" />
      <SocialButton
        data={{
          social: 'kakao',
          link: 'https://03adbca0-7e7a-4d4f-be59-e432880d0b5d.mock.pstmn.io/v1/users/login/kakao',
        }}
        size="md"
      />
    </VStack>
  );
}

export default Login;
