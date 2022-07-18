import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import JoinInput from './JoinInput';
import { FormValues, UserType } from './types';

function Join() {
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else {
      setAuthHeader(accessToken);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    instance.get('/v1/users/me').then((res) => {
      if (res.data.name) setValue('name', res.data.name);
      if (res.data.nickname) setValue('nickname', res.data.nickname);
      if (res.data.email) setValue('email', res.data.email);
      if (res.data.phone) setValue('phone', res.data.phone);
      if (res.data.gender) setValue('gender', res.data.gender);
      if (res.data.age) setValue('age', res.data.age);

      if (res.data.avatar) setPreview(res.data.avatar);
    });
  }, []);

  const avatarRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState(avatarRef.current?.files);
  const [preview, setPreview] = useState<string>();
  const router = useRouter();

  const handleAvatar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const handleAvatarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (avatarRef.current?.files) {
      setImg(avatarRef.current?.files);
      const file = avatarRef.current?.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (
      (img && data.agreeAllTerms) ||
      (img && data.requiredTerms && data.marketingTerms)
    ) {
      instance.patch('/v1/users/me', data).then((res) => console.log(res.data));

      const formData = new FormData();
      formData.append('avatar', img[0]);
      instance
        .patch('/v1/users/me', formData)
        .then((res) => console.log(res.data));
      router.replace('join/success');
    } else if (
      data.agreeAllTerms ||
      (img && data.requiredTerms && data.marketingTerms)
    ) {
      instance.patch('/v1/users/me', data).then((res) => console.log(res.data));
      router.replace('join/success');
    }
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

  const [isJoinButtonActive, setIsJoinButtonActive] = useState(false);
  useEffect(() => {
    if (getValues('requiredTerms') && getValues('privateInfoTerms')) {
      setIsJoinButtonActive(true);
    } else setIsJoinButtonActive(false);
  }, [toggle]);

  const validateNickname = (text: string) => {
    const patter1 = /[a-zA-Z]/;
    const patter2 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힇]/;
    if (patter1.test(text)) return text.length >= 1 && text.length <= 5;
    else if (patter2.test(text)) return text.length >= 2 && text.length <= 10;
    else return false;
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
          <Avatar w="70px" h="70px" src={preview}>
            <AvatarBadge
              boxSize="20px"
              bg="primary.500"
              borderWidth="0"
              position="absolute"
              right="5px"
              bottom="5px"
              _hover={{ cursor: 'pointer' }}
              onClick={handleAvatar}
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
          <Input
            display="none"
            type="file"
            multiple
            accept="image/*"
            ref={avatarRef}
            onChange={handleAvatarOnChange}
          ></Input>
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
                validate: (nickname: string) => validateNickname(nickname),
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
              {...register('gender')}
            >
              <option value="남성">남</option>
              <option value="여성">여</option>
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
            {...ButtonStyle}
            type="submit"
            colorScheme="primary"
            w="343px"
            h="50px"
            borderRadius="25px"
            py="11px"
            disabled={!isJoinButtonActive}
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

const ButtonStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
