import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import SinglePay from './SinglePay';

function Complete() {
  return (
    <>
      <VStack spacing={0} alignItems="flex-start" pt="130px" px="16px">
        <Box {...TitleText} w="full" pb="80px">
          결제내역
        </Box>
        <Box
          {...DateText}
          w="full"
          py="19px"
          borderTop="1px solid #F9F9F9"
          borderBottom="1px solid #F9F9F9"
        >
          [2021 - 04 - 01]
        </Box>
        <SinglePay
          product={{ id: 3, name: '샴푸 & 바디', capacity: 120, price: 27000 }}
          quantity={1}
          isPayCompleted
        ></SinglePay>
        <Box w="full" h="10px" bg="gray.100"></Box>
        <Flex {...SubTitleText} w="full" h="55px" alignItems="center">
          배송지 정보
        </Flex>
        <VStack
          {...PayText}
          spacing="10px"
          pt="15px"
          pb="24px"
          justify="flex-start"
          w="full"
        >
          <HStack spacing="10px" w="full">
            <Box w="92px">이름</Box>
            <Box color="gray.700">김인코스런</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">핸드폰 번호</Box>
            <Box color="gray.700">010-1234-1234</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">우편번호</Box>
            <Box color="gray.700">01234</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">주소</Box>
            <Box w="214px" color="gray.700">
              서울특별시 마포구 성산동 123-3 성산빌딩 B동 502호
            </Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">배송요청사항</Box>
            <Box color="gray.700">문앞에 두고 가주세요</Box>
          </HStack>
        </VStack>
      </VStack>
      <Box w="full" h="10px" bg="gray.100"></Box>
      <VStack spacing={0} px="16px" pb="30px">
        <Flex {...SubTitleText} w="full" h="55px" alignItems="center">
          결제 정보
        </Flex>
        <VStack
          {...PayText}
          spacing="10px"
          pt="15px"
          pb="50px"
          justify="flex-start"
          w="full"
          color="gray.700"
        >
          <HStack w="full" justify="space-between">
            <Box>총 상품금액</Box>
            <Box>27,000 원</Box>
          </HStack>
          <HStack w="full" justify="space-between">
            <Box>총 배송비</Box>
            <Box>2,500 원</Box>
          </HStack>
          <HStack w="full" justify="space-between">
            <Box>결제수단</Box>
            <Box fontWeight="700">신용카드 결제</Box>
          </HStack>
          <HStack w="full" pt="35px" justify="space-between">
            <Box color="#1A1A1A">결제금액</Box>
            <Box color="primary.500" fontWeight="700">
              29,500 원
            </Box>
          </HStack>
        </VStack>
        <Flex justify="space-between" w="full">
          <Button
            {...ButtonText}
            borderRadius="25px"
            colorScheme="primary"
            variant="outline"
            w="165px"
            h="50px"
            py="12px"
            type="submit"
          >
            메인화면 이동
          </Button>
          <Button
            {...ButtonText}
            borderRadius="25px"
            colorScheme="primary"
            w="165px"
            h="50px"
            py="12px"
            type="submit"
          >
            주문내역 이동
          </Button>
        </Flex>
      </VStack>
    </>
  );
}

export default Complete;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const DateText = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const SubTitleText = {
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '28px',
};

const PayText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const NameStyle = {
  fontSize: '12px',
  color: 'primary.500',
  fontWeight: 700,
  lineheight: '18px',
  pb: '10px',
};

const ButtonText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
