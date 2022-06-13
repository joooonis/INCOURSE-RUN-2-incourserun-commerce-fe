import React from 'react';

import { Heading, Text, VStack } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

const Footer = () => {
  return (
    <VStack
      bg="gray.800"
      px={LAYOUT.SIZE.PADDING}
      w="100%"
      maxW={LAYOUT.SIZE.WIDTH}
      alignItems="flex-start"
    >
      <Heading fontSize={16} fontWeight="500" color="white" pt="35px" pb="30px">
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
  );
};

export default Footer;
