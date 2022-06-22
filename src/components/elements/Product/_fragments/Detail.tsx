import React from 'react';

import { Box, Button, Flex, Image, VStack } from '@chakra-ui/react';

function Detail() {
  return (
    <>
      <Box
        borderRadius="20px"
        mx="16px"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
      >
        <Image src="/images/product/card.png" />
        <VStack
          top="100px"
          left="30px"
          position="absolute"
          flexDir="column"
          alignItems="flex-start"
          spacing="9px"
        >
          <Image src="/images/product/logo1.svg" />
          <Image src="/images/product/logo2.svg" />
          <Image src="/images/product/logo3.svg" />
        </VStack>
        <Flex
          flexDir="column"
          alignItems="flex-start"
          px="17px"
          pt="30px"
          pb="20px"
        >
          <Box px="13px">
            <Box {...TitleText}>
              바스 & 샴푸
              <span
                style={{
                  paddingLeft: '5px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: '#757983',
                }}
              >
                300ml
              </span>
            </Box>
            <Box {...PriceText} pt="10px">
              27000
              <span
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '29px',
                  color: 'black',
                }}
              >
                원
              </span>
            </Box>
            <Box {...TitleText}>
              4.3
              <span
                style={{
                  paddingLeft: '3px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '28px',
                  color: '#757983',
                }}
              >
                (리뷰 125개)
              </span>
            </Box>
            <Box {...SubText} pt="25px">
              # 올인원 # 클렌져 # 마일드 # 바스앤샴푸
            </Box>
          </Box>

          <Flex justify="space-between" w="100%" pt="20px" pb="10px">
            <Button
              colorScheme="primary"
              w="150px"
              h="50px"
              borderRadius="25px"
              size="sd"
              py="12px"
            >
              바로구매
            </Button>
            <Button
              variant="outline"
              colorScheme="primary"
              w="150px"
              h="50px"
              borderRadius="25px"
              size="sd"
              py="12px"
            >
              장바구니
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Detail;

const TitleText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const PriceText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'primary.500',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.700',
};
