import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import PrimaryButton from '@components/common/Button/Button';
import CheckBox from '@components/common/CheckBox';
import { LogOutModal } from '@components/elements/Modal';

import { getToken } from '@utils/localStorage/token';

function Withdrawal() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);
  const [value, setValue] = useState('1');

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <LogOutModal isOpen={isOpen} onClose={onClose} />
      <Box>
        <Box pt="130px" px="16px" pb="80px">
          <Box {...TitleText} w="full">
            회원 탈퇴
          </Box>
        </Box>

        <Box {...BasicText} px="16px" py="18px" bg="gray.100">
          회원 탈퇴 시 개인 정보 및 인코스런에서 만들어진 <br /> 모든 데이터는
          삭제됩니다. 한 번 삭제된 정보는 복구가 불가능합니다.
        </Box>
        <Box px="16px">
          <Flex {...SubText} w="full" h="55px" alignItems="center">
            회원 정보
          </Flex>
          <VStack
            {...BasicText}
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
              <Box w="92px">이메일주소</Box>
              <Box color="gray.700">12345</Box>
            </HStack>
          </VStack>
        </Box>
        <Box w="full" h="10px" bg="gray.100"></Box>
        <Box px="16px">
          <Flex {...SubText} w="full" h="55px" alignItems="center">
            탈퇴 사유
          </Flex>
          <RadioGroup onChange={setValue} value={value}>
            <VStack
              {...BasicText}
              spacing="10px"
              align="flex-start"
              pt="15px"
              pb="30px"
            >
              <Radio
                size="lg"
                colorScheme="primary"
                value="아이디 변경(재가입)"
              >
                <Box {...BasicText}>아이디 변경(재가입)</Box>
              </Radio>
              <Radio
                size="lg"
                colorScheme="primary"
                value="서비스 및 고객지원 불만족"
              >
                <Box {...BasicText}>서비스 및 고객지원 불만족</Box>
              </Radio>
              <Radio size="lg" colorScheme="primary" value="타 브랜드 이용">
                <Box {...BasicText}>타 브랜드 이용</Box>
              </Radio>
              <Radio size="lg" colorScheme="primary" value="기타">
                <Box {...BasicText}>기타</Box>
              </Radio>
              <Input {...InputStyle} placeholder="사유를 입력해주세요" />
            </VStack>
          </RadioGroup>
        </Box>
        <Box w="fll" h="10px" bg="gray.100"></Box>
        <Box px="16px" pb="80px">
          <Flex {...SubText} w="full" h="55px" alignItems="center">
            인코스런을 입력하세요
          </Flex>
          <Input {...InputStyle} placeholder="인코스런" />
        </Box>
        <Flex justify="space-between" px="16px" pb="30px">
          <PrimaryButton variant="outline" w="165px">
            취소
          </PrimaryButton>
          <PrimaryButton w="165px">탈퇴하기</PrimaryButton>
        </Flex>
      </Box>
    </>
  );
}

export default Withdrawal;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const SubText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const BasicText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const InputStyle = {
  variant: 'outline',
  size: 'xs',
  px: '19px',
  py: '5px',
  h: '40px',
  fontSize: '16px',
  outline: '1px solid #1A1A1A',
  borderRadius: '100px',
  lineHeight: '28px',
  _focus: { border: '2px solid #FF710B', outline: 'none' },
  _placeholder: { color: 'gray.400' },
};
