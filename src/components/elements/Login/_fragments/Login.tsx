import React from 'react';

import { Box, Image, VStack } from '@chakra-ui/react';

import SocialButton from '@components/common/SocialButton';

function Login() {
  return (
    <VStack
      w="full"
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
          link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/users/login/kakao`,
        }}
        size="md"
      />
    </VStack>
  );
}

export default Login;
