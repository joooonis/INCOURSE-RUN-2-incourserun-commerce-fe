import React from 'react';

import { Container, Heading, Text, VStack } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

const Footer = () => {
  return (
    <>
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
              구성원 &#124; 모창일 박태준 최보미 <br />
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
