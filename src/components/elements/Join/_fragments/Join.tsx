import React from 'react';
import { Path, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

interface IFormValues {
  profileImg: File;
  name: string;
  nicName: string;
  Email: string;
  phone: string;
  gender: string;
  age: string;
  agreeAllTerms: boolean;
  requiredTerms: boolean;
  privateInfoTerms: boolean;
  marketingTerms: boolean;
}
interface JoinInputProps {
  label: Path<IFormValues>;
  name: string;
  placeholder: string;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
}

function JoinInput({
  label,
  name,
  placeholder,
  register,
  required,
}: JoinInputProps) {
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
    _placeholder: { color: '#1A1A1A' },
  };
  const NameStyle = {
    fontSize: '12px',
    color: 'primary.500',
    fontWeight: 700,
    lineheight: '18px',
    pb: '10px',
  };
  return (
    <Box w="full">
      <Text {...NameStyle}>{name}</Text>
      <Input
        {...InputStyle}
        placeholder={placeholder}
        {...register(label, { required })}
      ></Input>
    </Box>
  );
}

function Terms() {
  const [checkedItems, setCheckedItems] = React.useState([false, false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <VStack w="full" justify="space-between" align="cener">
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

function Join() {
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(JSON.stringify(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="flex-start">
        <Box>
          <Heading size="lg">회원가입</Heading>
        </Box>
        <Box pt="60px">
          <Heading size="sm">회원정보입력</Heading>
        </Box>
        <Box py="40px" alignSelf="center">
          <Avatar w="70px" h="70px">
            <AvatarBadge
              boxSize="20px"
              bg="primary.500"
              borderWidth="0"
              position="absolute"
              right="5px"
              bottom="5px"
              _before={{
                content: '""',
                display: 'block',
                width: '1.5px',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: 'white',
                position: 'absolute',
              }}
              _after={{
                content: '""',
                display: 'block',
                width: '10px',
                height: '1.5px',
                borderRadius: '2px',
                backgroundColor: 'white',
                position: 'absolute',
              }}
            />
          </Avatar>
        </Box>
        <VStack spacing="50px" w="full" alignItems="flex-start">
          <JoinInput
            label="name"
            name="이름"
            placeholder="김인코스런"
            register={register}
            required
          />
          <JoinInput
            label="nicName"
            name="닉네임"
            placeholder="인코스런"
            register={register}
            required
          />
          <JoinInput
            label="phone"
            name="핸드폰 번호"
            placeholder="010-1234-1234"
            register={register}
            required
          />
          <JoinInput
            label="Email"
            name="이메일 주소"
            placeholder="incourse.run@gmail.com"
            register={register}
            required
          />
          <Box pt="60px">
            <Heading size="sm">추가정보입력(선택)</Heading>
          </Box>
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
        </VStack>
        <Box py="60px">
          <Heading size="sm">이용약관동의</Heading>
        </Box>
        <Terms />
        <Box w="full" py="60px">
          <Button
            type="submit"
            colorScheme="primary"
            w="full"
            borderRadius="25px"
            size="sd"
            py="12px"
          >
            회원가입 완료
          </Button>
        </Box>
      </VStack>
    </form>
  );
}

export default Join;
