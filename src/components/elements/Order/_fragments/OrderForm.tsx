import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';

import { SERVER_URL } from '@components/elements/urls';

import SingleOrder from './SingleOrder';
import { FormValues, User } from './types';

function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const testP = {
    id: 1,
    name: '오일',
    capacity: 200,
    price: 15000,
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={0} alignItems="flex-start" pt="130px" px="16px">
        <Box {...TitleText} w="full">
          주문내역
        </Box>
        <Box h="80px"></Box>
        <Box {...SubTitleText} w="full">
          주문상품
        </Box>
        <SingleOrder product={testP} quantity={2}></SingleOrder>
        <VStack spacing="78px" w="full" alignItems="flex-start"></VStack>
        <Flex justify="space-between" w="100%" pt="81px" pb="30px">
          <Button
            variant="outline"
            colorScheme="primary"
            w="165px"
            h="50px"
            borderRadius="25px"
            size="sd"
            py="12px"
          >
            취소
          </Button>
          <Button
            colorScheme="primary"
            w="165px"
            h="50px"
            borderRadius="25px"
            size="sd"
            py="12px"
            type="submit"
          >
            저장
          </Button>
        </Flex>
      </VStack>
    </form>
  );
}

export default OrderForm;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const SubTitleText = {
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '28px',
};

const ButtonStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
