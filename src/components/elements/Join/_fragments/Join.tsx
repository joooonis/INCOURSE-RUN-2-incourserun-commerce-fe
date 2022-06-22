import React from 'react';

import {
  Avatar,
  AvatarBadge,
  Box,
  BoxProps,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

interface JoinProps extends BoxProps {}

interface JoinInputProps {
  label?: string;
  placeholder?: string;
}

function JoinInput({ label, placeholder }: JoinInputProps) {
  return (
    <FormControl isRequired>
      <FormLabel fontSize="12px" color="primary.500">
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

function Terms() {
  const [checkedItems, setCheckedItems] = React.useState([false, false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <VStack w="100%" justify="space-between" align="cener">
      <Flex
        justify="space-between"
        mb="20px"
        pb="7px"
        borderBottom="2px solid #FF710B"
      >
        <Text color="primary.500" fontSize="16px" fontWeight="700">
          아래 약관에 모두 동의합니다.
        </Text>
        <Checkbox
          ml={0}
          display="none"
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) =>
            setCheckedItems([
              e.target.checked,
              e.target.checked,
              e.target.checked,
            ])
          }
        ></Checkbox>
        <Image src="/icons/svg/check-circle.svg" alt="checkAll" />
      </Flex>
      <Flex justify="space-between" py="20px">
        <Text color="gray.600" fontSize="12px" textDecor="underline">
          서비스 이용을 위한 필수약관 동의
        </Text>
        <Checkbox
          display="none"
          isChecked={checkedItems[0]}
          onChange={(e) =>
            setCheckedItems([
              e.target.checked,
              checkedItems[1],
              checkedItems[2],
            ])
          }
        />
        <Image src="/icons/svg/check-line.svg" alt="check0" />
      </Flex>
      <Flex justify="space-between" py="20px">
        <Text color="gray.600" fontSize="12px" textDecor="underline">
          개인정보수집 및 이용, 제 3차 제공 동의
        </Text>
        <Checkbox
          display="none"
          isChecked={checkedItems[1]}
          onChange={(e) =>
            setCheckedItems([
              checkedItems[0],
              e.target.checked,
              checkedItems[2],
            ])
          }
        />
        <Image src="/icons/svg/check-line.svg" alt="check1" />
      </Flex>
      <Flex justify="space-between" py="20px">
        <Text color="gray.600" fontSize="12px" textDecor="underline">
          마케팅 정보 수신 및 맞춤형 광고 동의(선택)
        </Text>
        <Checkbox
          display="none"
          isChecked={checkedItems[2]}
          onChange={(e) =>
            setCheckedItems([
              checkedItems[0],
              checkedItems[1],
              e.target.checked,
            ])
          }
        />
        <Image src="/icons/svg/check-line.svg" alt="check2" />
      </Flex>
    </VStack>
  );
}

function Join({ ...basisProps }: JoinProps) {
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
          <AvatarBadge boxSize="1em" bg="primary.500" />
        </Avatar>
      </Box>
      <SimpleGrid columns={1} spacingY="50px" w="full">
        <GridItem colSpan={1}>
          <JoinInput label="이름" placeholder="김인코스런" />
        </GridItem>
        <GridItem colSpan={1}>
          <JoinInput label="닉네임" placeholder="인코스런" />
        </GridItem>
        <GridItem colSpan={1}>
          <JoinInput label="핸드폰번호" placeholder="010-1234-1234" />
        </GridItem>
        <GridItem colSpan={1}>
          <JoinInput label="이메일주소" placeholder="incourse.run@gmail.com" />
        </GridItem>
        <Box pt="60px">
          <Heading size="sm">추가정보입력(선택)</Heading>
        </Box>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel fontSize="12px" color="primary.500">
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
            <FormLabel fontSize="12px" color="primary.500">
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
      <Terms />
      <Box w="100%" py="60px">
        <Button
          colorScheme="primary.500"
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

export default Join;
