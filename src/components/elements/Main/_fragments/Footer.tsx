import React from 'react';

import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

const Footer = () => {
  return (
    <>
      <Container
        bgGradient="linear(to-r, #FF710B, #FFAB2E)"
        maxW={LAYOUT.SIZE.WIDTH}
        position="relative"
      >
        <VStack w="100%" maxW={LAYOUT.SIZE.WIDTH} alignItems="center">
          <Box {...TitleText} pt="83px">
            인코스런에 대해 더 궁금하신가요?{' '}
          </Box>
          <Box {...SubText} pt="2px" textAlign="center">
            인스타 그램을 방문하시면 더욱 다양한 <br />
            인코스런의 이야기를 확인하실 수 있어요!
          </Box>
          <Flex
            {...SubText}
            alignItems="center"
            pt="4px"
            pb="82px"
            fontWeight="700"
          >
            <Image pr="8px" src="/icons/svg/instagram.svg" alt="instagram" />
            INCOURSE.RUN
          </Flex>
          <Box
            border="1px solid #1A1A1A"
            w="50px"
            h="50px"
            borderRadius="50%"
            position="absolute"
            right="16px"
            bottom="20px"
          >
            <Box
              position="absolute"
              width="12px"
              height="12px"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%) rotate(45deg)"
              _before={{
                content: '""',
                width: '100%',
                height: '100%',
                position: 'absolute',
                border: '1px solid #1A1A1A',
                borderRight: 0,
                borderBottom: 0,
              }}
              _after={{
                content: '""',
                height: '1px',
                width: '16px',
                backgroundColor: '#1A1A1A',
                position: 'absolute',
                transformOrigin: '0 100%',
                transform: 'rotate(45deg)',
              }}
            ></Box>
          </Box>
        </VStack>
      </Container>
      <Container bg="gray.800" maxW={LAYOUT.SIZE.WIDTH}>
        <VStack
          bg="gray.800"
          w="100%"
          maxW={LAYOUT.SIZE.WIDTH}
          alignItems="flex-start"
        >
          <Heading
            fontSize={16}
            fontWeight="500"
            color="white"
            pt="35px"
            pb="30px"
          >
            INCOURSE.RUN
          </Heading>
          <VStack alignItems="flex-start" color="white">
            <Text fontSize={12} fontWeight="300" lineHeight={2}>
              팀명 &#124; 인코스런 <br />
              구성원 &#124; 모창일 박태준 <br />
              이메일 incourse.run@gmail.com
            </Text>
            <Text fontSize={12} fontWeight="300" pt="40px" pb="55px">
              &#169; INCOURSE.RUN All Right Reserved.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default Footer;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'white',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'white',
};
