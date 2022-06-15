import React from 'react';

import {
  Avatar,
  AvatarBadge,
  Box,
  BoxProps,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Icon,
  Input,
  Select,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

interface LoginPageContentProps extends BoxProps {}

interface LoginInputProps {
  label?: string;
  placeholder?: string;
}

const CheckIcon = () => {
  return (
    <Icon viewBox="0 0 70 70">
      <path
        d="M11.957 61.2791C12.4572 58.1032 13.6676 55.0812 15.4979 52.438C17.3281 49.7948 19.7312 47.5987 22.528 46.0131C22.7008 45.9199 22.8967 45.8781 23.0925 45.8927C23.2883 45.9072 23.4758 45.9774 23.633 46.0951C27.127 48.5362 31.3012 49.8146 35.563 49.7491C39.8607 49.8156 44.0684 48.5151 47.579 46.0351C47.7026 45.9416 47.8466 45.8786 47.9992 45.8513C48.1518 45.824 48.3086 45.8332 48.457 45.8781C48.5598 45.9144 48.6583 45.9617 48.751 46.0191C53.551 49.0191 58.063 54.1641 59.412 60.0101C52.891 66.3927 44.1258 69.9615 35.001 69.9491C26.5201 69.9621 18.326 66.8792 11.957 61.2791H11.957Z"
        fill="white"
      />
    </Icon>
  );
};

function LoginInput({ label, placeholder }: LoginInputProps) {
  return (
    <FormControl isRequired>
      <FormLabel fontSize="12px" color="brand.primary.500">
        {label}
      </FormLabel>
      <Input
        _focus={{ border: '2px solid #FF710B', outline: 'none' }}
        variant="outline"
        size="xs"
        px="19px"
        py="5px"
        h="40px"
        fontSize="16px"
        placeholder={placeholder}
        _placeholder={{ color: '#1A1A1A' }}
        outline="1px solid #1A1A1A"
        borderRadius="100px"
        lineHeight="28px"
      ></Input>
    </FormControl>
  );
}

function CheckBoxInput({ label }: LoginInputProps) {
  return (
    <FormControl isRequired>
      <FormLabel
        display="flex"
        align-items="center"
        position="relative"
        w="fit-content"
        fontSize="12px"
        color="#999999"
        margin="10px 0 20px"
        textAlign="left"
        _before={{
          w: '10px',
          h: '10px',
          border: '2px solid #61768b',
          borderRadius: '10px',
        }}
        _after={{
          w: '10px',
          h: '10px',
          color: '#61768B',
          bgColor: '#61768B',
          borderRadius: '10px',
        }}
      >
        {label}
      </FormLabel>
      <Input display="none"></Input>
    </FormControl>
  );
}

function TermsCheckBox() {
  const [checkedItems, setCheckedItems] = React.useState([false, false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) =>
          setCheckedItems([
            e.target.checked,
            e.target.checked,
            e.target.checked,
          ])
        }
      >
        아래 약관에 모두 동의합니다.
      </Checkbox>
      <Checkbox
        isChecked={checkedItems[0]}
        onChange={(e) =>
          setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])
        }
      >
        서비스 이용을 위한 필수약관 동의
      </Checkbox>
      <Checkbox
        isChecked={checkedItems[1]}
        onChange={(e) =>
          setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])
        }
      >
        개인정보수집 및 이용, 제3자 제공 동의
      </Checkbox>
      <Checkbox
        isChecked={checkedItems[2]}
        onChange={(e) =>
          setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])
        }
      >
        마케팅 정보 수신 및 맞춤형 광고 동의(선택)
      </Checkbox>
    </>
  );
}

function LoginPageContent({ ...basisProps }: LoginPageContentProps) {
  return (
    <VStack alignItems="flex-start" {...basisProps}>
      <Box>
        <Heading size="lg">회원가입</Heading>
      </Box>
      <Box pt="60px">
        <Heading size="sm">회원정보입력</Heading>
      </Box>
      <Box py="40px" alignSelf="center">
        <Avatar size="lg">
          <AvatarBadge boxSize="1em" bg="brand.primary.500" />
        </Avatar>
      </Box>
      <SimpleGrid columns={1} spacingY="50px" w="full">
        <GridItem colSpan={1}>
          <LoginInput label="이름" placeholder="김인코스런" />
        </GridItem>
        <GridItem colSpan={1}>
          <LoginInput label="닉네임" placeholder="인코스런" />
        </GridItem>
        <GridItem colSpan={1}>
          <LoginInput label="핸드폰번호" placeholder="010-1234-1234" />
        </GridItem>
        <GridItem colSpan={1}>
          <LoginInput label="이메일주소" placeholder="incourse.run@gmail.com" />
        </GridItem>
        <Box pt="60px">
          <Heading size="sm">추가정보입력(선택)</Heading>
        </Box>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontSize="12px" color="brand.primary.500">
              성별
            </FormLabel>
            <Select
              variant="flushed"
              borderBottom="2px solid #CBCED6"
              _focus={{ borderBottom: '2px solid #FF710B' }}
              fontSize="16px"
              placeholder="성별을 선택하세요"
              color="gray.400"
            >
              <option value="male">남</option>
              <option value="female">여</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontSize="12px" color="brand.primary.500">
              연령대
            </FormLabel>
            <Select
              variant="flushed"
              borderBottom="2px solid #CBCED6"
              _focus={{ borderBottom: '2px solid #FF710B' }}
              fontSize="16px"
              placeholder="연령대를 선택하세요"
              _placeholder={{ color: '#FF710B' }}
              color="gray.400"
              _selected={{ color: '#1A1A1A' }}
            >
              <option value="10대">10대</option>
              <option value="20대">20대</option>{' '}
              <option value="30대">30대</option>
              <option value="40대">40대</option>
              <option value="50대">50대</option>
              <option value="60대">60대</option>
            </Select>
          </FormControl>
        </GridItem>
      </SimpleGrid>
      <Box py="60px">
        <Heading size="sm">이용약관동의</Heading>
      </Box>
      <TermsCheckBox></TermsCheckBox>
      <Box w="100%" py="60px">
        <Button
          colorScheme="brand.primary"
          w="100%"
          borderRadius="25px"
          size="sd"
          py="12px"
        >
          회원가입 완료
        </Button>
      </Box>
    </VStack>
  );
}

export default LoginPageContent;
