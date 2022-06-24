import React, { useState } from 'react';
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
  Link,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';

interface Options {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

interface IFormValues {
  profileImg: File;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
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
  options?: Options;
}

function JoinInput({
  label,
  name,
  placeholder,
  register,
  options,
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
        {...register(label, { ...options })}
      />
    </Box>
  );
}

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(JSON.stringify(data));
  };

  const [toggle, setToggle] = useState(false);
  const checkboxHandler = (e: any) => {
    setValue(e.currentTarget.id, !getValues(e.currentTarget.id));
    if (
      e.currentTarget.id === 'agreeAllTerms' &&
      getValues('agreeAllTerms') === true
    ) {
      setValue('requiredTerms', true);
      setValue('privateInfoTerms', true);
      setValue('marketingTerms', true);
      setToggle(!toggle);
    } else if (
      e.currentTarget.id === 'agreeAllTerms' &&
      getValues('agreeAllTerms') === false
    ) {
      setValue('requiredTerms', false);
      setValue('privateInfoTerms', false);
      setValue('marketingTerms', false);
      setToggle(!toggle);
    } else {
      setValue('agreeAllTerms', false);
      setToggle(!toggle);
    }
    if (
      e.currentTarget.id !== 'agreeAllTerms' &&
      getValues(['requiredTerms', 'privateInfoTerms', 'marketingTerms']).every(
        Boolean,
      )
    ) {
      setValue('agreeAllTerms', true);
      setToggle(!toggle);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={0} alignItems="flex-start">
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
        <VStack spacing="78px" w="full" alignItems="flex-start">
          <FormControl>
            <JoinInput
              label="name"
              name="이름"
              placeholder="김인코스런"
              register={register}
              options={{
                required: true,
                minLength: 2,
              }}
            ></JoinInput>
            {errors.name && (
              <Box {...ErrorStyle}>최소 2자 이상 입력해주세요.</Box>
            )}
          </FormControl>
          <FormControl>
            <JoinInput
              label="nickname"
              name="닉네임"
              placeholder="인코스런"
              register={register}
              options={{
                required: true,
                minLength: 2,
                maxLength: 5,
              }}
            />
            {errors.nickname && (
              <Box {...ErrorStyle}>
                한글 1~5자, 영문 및 숫자 2~10자 사이로 입력해주세요.
              </Box>
            )}
          </FormControl>
          <FormControl>
            <JoinInput
              label="phone"
              name="핸드폰 번호"
              placeholder="010-1234-1234"
              register={register}
              options={{
                required: true,
                pattern: /^\(?\d{3}\)?[\s.-]\d{4}[\s.-]\d{4}$/,
              }}
            />
            {errors.phone && (
              <Box {...ErrorStyle}>정확한 핸드폰 번호를 입력해주세요.</Box>
            )}
          </FormControl>
          <FormControl>
            <JoinInput
              label="email"
              name="이메일 주소"
              placeholder="incourse.run@gmail.com"
              register={register}
              options={{
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              }}
            />
            {errors.email && (
              <Box {...ErrorStyle}>이메일 주소를 정확하게 입력해주세요.</Box>
            )}
          </FormControl>
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
              {...register('gender')}
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
              {...register('age')}
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
        <Box pt="81px" pb="44px">
          <Heading size="sm">이용약관동의</Heading>
        </Box>
        <VStack w="full" spacing="42px" justify="space-between" align="cener">
          <Flex
            justify="space-between"
            borderBottom="2px solid #FF710B"
            pb="7px"
          >
            <Text color="primary.500" fontSize="16px" fontWeight="700">
              아래 약관에 모두 동의합니다.
            </Text>
            <Checkbox
              id="agreeAllTerms"
              display="none"
              ml={0}
              {...register('agreeAllTerms')}
              onChange={checkboxHandler}
            ></Checkbox>
            <label htmlFor="agreeAllTerms">
              {getValues('agreeAllTerms') === true ? (
                <Image
                  src="/icons/svg/join/checked_circle.svg"
                  alt="checkAll"
                />
              ) : (
                <Image src="/icons/svg/join/check_circle.svg" alt="checkAll" />
              )}
            </label>
          </Flex>
          <Flex justify="space-between">
            <Link href="https://toktokhan.notion.site/6e7a309e8d14464cad38fc86656d564a">
              <Text color="gray.600" fontSize="12px" textDecor="underline">
                서비스 이용을 위한 필수약관 동의
              </Text>
            </Link>

            <Checkbox
              id="requiredTerms"
              display="none"
              {...register('requiredTerms')}
              onChange={checkboxHandler}
            />
            <label htmlFor="requiredTerms">
              {getValues('requiredTerms') === true ? (
                <Image src="/icons/svg/join/checked_line.svg" alt="check1" />
              ) : (
                <Image src="/icons/svg/join/check_line.svg" alt="check1" />
              )}
            </label>
          </Flex>
          <Flex justify="space-between">
            <Link href="https://toktokhan.notion.site/3-2261ee2f25024c0a9b6a82a6f43fd0dc">
              <Text color="gray.600" fontSize="12px" textDecor="underline">
                개인정보수집 및 이용, 제 3차 제공 동의
              </Text>
            </Link>
            <Checkbox
              id="privateInfoTerms"
              display="none"
              {...register('privateInfoTerms')}
              onChange={checkboxHandler}
            />
            <label htmlFor="privateInfoTerms">
              {getValues('privateInfoTerms') === true ? (
                <Image src="/icons/svg/join/checked_line.svg" alt="check2" />
              ) : (
                <Image src="/icons/svg/join/check_line.svg" alt="check2" />
              )}
            </label>
          </Flex>
          <Flex justify="space-between">
            <Link href="https://toktokhan.notion.site/24f69842ebec48df89a3656bac7cf4c9">
              <Text color="gray.600" fontSize="12px" textDecor="underline">
                마케팅 정보 수신 및 맞춤형 광고 동의(선택)
              </Text>
            </Link>

            <Checkbox
              id="marketingTerms"
              display="none"
              {...register('marketingTerms')}
              onChange={checkboxHandler}
            />
            <label htmlFor="marketingTerms">
              {getValues('marketingTerms') === true ? (
                <Image src="/icons/svg/join/checked_line.svg" alt="check3" />
              ) : (
                <Image src="/icons/svg/join/check_line.svg" alt="check3" />
              )}
            </label>
          </Flex>
        </VStack>
        <Box w="full" pt="96px" pb="50px">
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

const ErrorStyle = {
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FF001A',
  pt: '10px',
};
