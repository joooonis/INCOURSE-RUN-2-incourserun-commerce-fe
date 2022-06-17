import React from 'react';

import { Box, Image, VStack } from '@chakra-ui/react';

import SocialButton from '@components/common/SocialButton';

function Login() {
  return (
    <VStack
      w="100%"
      py="50px"
      bg="brand.primary.500"
      h="812px"
      justify="space-between"
    >
      <Box></Box>
      <Image src="/icons/svg/logo-login.svg" alt="logo" />
      <SocialButton data={{ social: 'kakao', link: './' }} size="md" />
    </VStack>
  );
}

export default Login;
