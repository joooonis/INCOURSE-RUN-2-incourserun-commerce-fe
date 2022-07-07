import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Box, Flex, Image } from '@chakra-ui/react';

import { SERVER_URL } from '@components/elements/urls';

type User = {
  username: string;
  email: string;
};

function My() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    axios.get(SERVER_URL.LOCAL + '/v1/users/1').then((res) => {
      setUser(res.data);
    });
  }, []);

  const router = useRouter();

  const gotoOrder = () => {
    router.replace('order');
  };

  const gotoMyReview = () => {
    router.replace('review/myreview');
  };

  return (
    <Box>
      {user && (
        <Box px="16px" pt="150px" pb="30px">
          <Box {...TitleText} w="full">
            {user.username}
          </Box>
          <Box {...BasicText} color="gray.400" w="full">
            {user.email}
          </Box>
        </Box>
      )}

      <Box w="full" h="10px" bg="gray.100"></Box>
      <Flex w="full">
        <Box
          {...SubText}
          w="calc(100% / 3)"
          pt="86px"
          pb="36px"
          textAlign="center"
          position="relative"
        >
          <Image
            src="/images/my/edit.png"
            w="41.52px"
            h="21.22px"
            alt="edit"
            position="absolute"
            left="44px"
            bottom="78px"
          />
          회원정보 수정
        </Box>
        <Box
          {...SubText}
          w="calc(100% / 3)"
          pt="86px"
          pb="36px"
          textAlign="center"
          position="relative"
          _hover={{ cursor: 'pointer' }}
          onClick={gotoOrder}
        >
          <Image
            src="/images/my/cart.png"
            w="36.55px"
            h="33.13px"
            alt="cart"
            position="absolute"
            left="44px"
            bottom="72px"
          />
          주문내역
        </Box>
        <Box
          {...SubText}
          w="calc(100% / 3)"
          pt="86px"
          pb="36px"
          textAlign="center"
          position="relative"
          _hover={{ cursor: 'pointer' }}
          onClick={gotoMyReview}
        >
          <Image
            src="/images/my/review.png"
            w="27.81px"
            h="24.87px"
            alt="review"
            position="absolute"
            left="49px"
            bottom="76px"
          />
          내 상품 리뷰
        </Box>
      </Flex>
      <Box w="full" h="10px" bg="gray.100"></Box>
      <Flex
        {...BasicText}
        justify="space-between"
        alignItems="center"
        w="full"
        h="60px"
        px="16px"
        borderBottom="0.5px solid #F2F3F4"
      >
        회원탈퇴
        <Image src="/icons/svg/my/arrow.svg" alt="arrow" pr="8px" />
      </Flex>
      <Flex
        {...BasicText}
        justify="space-between"
        alignItems="center"
        w="full"
        h="60px"
        px="16px"
        borderBottom="0.5px solid #F2F3F4"
      >
        로그아웃 <Image src="/icons/svg/my/arrow.svg" alt="arrow" pr="8px" />
      </Flex>
      <Box w="full" h="30px" bg="gray.100"></Box>
    </Box>
  );
}

export default My;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const BasicText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
