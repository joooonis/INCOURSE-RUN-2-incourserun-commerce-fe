import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Image, useDisclosure } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { LogOutModal } from '@components/elements/Modal';

import { UserType } from './types';

function My() {
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else {
      setAuthHeader(accessToken);
    }
  }, []);

  const [user, setUser] = useState<UserType>();
  useEffect(() => {
    instance.get('/v1/users/me').then((res) => {
      setUser(res.data);
    });
  }, []);

  const router = useRouter();

  const gotoEdit = () => {
    router.push('mypage/edit');
  };

  const gotoOrder = () => {
    router.push('order');
  };

  const gotoMyReview = () => {
    router.push('review/myreview');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <LogOutModal isOpen={isOpen} onClose={onClose} />
      <Box>
        {user && (
          <Box px="16px" pt="150px" pb="30px">
            <Box {...TitleText} w="full">
              {user.name}
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
            _hover={{ cursor: 'pointer' }}
            onClick={gotoEdit}
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
          _hover={{ cursor: 'pointer' }}
          onClick={onOpen}
        >
          로그아웃 <Image src="/icons/svg/my/arrow.svg" alt="arrow" pr="8px" />
        </Flex>
        <Box w="full" h="30px" bg="gray.100"></Box>
      </Box>
    </>
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
