import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  useDisclosure,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { EditModal } from '@components/elements/Modal';

import EditInput from './EditInput';
import { FormValues } from './types';

function Edit() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
    else setAuthHeader(accessToken);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    instance.get('/v1/users/me').then((res) => {
      if (res.data.name) setValue('name', res.data.name);
      if (res.data.nickname) setValue('nickname', res.data.nickname);
      if (res.data.email) setValue('email', res.data.email);
      if (res.data.phone) setValue('phone', res.data.phone);
      if (res.data.gender) setValue('gender', res.data.gender);
      if (res.data.ageRange) setValue('ageRange', res.data.ageRange);
      if (res.data.avatar) setPreview(res.data.avatar);
    });
  }, []);

  const avatarRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState(avatarRef.current?.files);
  const [preview, setPreview] = useState<string>();

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
    if (data && img) {
      instance.patch('/v1/users/me', data);

      const formData = new FormData();
      formData.append('avatar', img[0]);
      instance.patch('/v1/users/me', formData).then(() => {
        onOpen();
        router.push('/');
      });
    } else if (data) {
      instance.patch('/v1/users/me', data).then(() => {
        onOpen();
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  function validateWithByte(str: string) {
    let byte = 0;
    for (let i = 0; i < str.length; ++i) {
      str.charCodeAt(i) > 127 ? (byte += 2) : byte++;
    }
    return byte >= 2 && byte <= 10;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditModal isOpen={isOpen} onClose={onClose} />
      <VStack spacing={0} alignItems="flex-start" pt="130px" px="16px">
        <Box>
          <Heading size="sm">회원정보수정</Heading>
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
            <EditInput
              label="name"
              name="이름"
              register={register}
              options={{
                required: true,
                minLength: 2,
              }}
            ></EditInput>
            {errors.name && (
              <Box {...ErrorStyle}>최소 2자 이상 입력해주세요.</Box>
            )}
          </FormControl>
          <FormControl>
            <EditInput
              label="nickname"
              name="닉네임"
              register={register}
              options={{
                required: true,
                validate: (nickname: string) => validateWithByte(nickname),
              }}
            />
            {errors.nickname && (
              <Box {...ErrorStyle}>
                한글 1~5자, 영문 및 숫자 2~10자 사이로 입력해주세요.
              </Box>
            )}
          </FormControl>
          <FormControl>
            <EditInput
              label="phone"
              name="핸드폰 번호"
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
            <EditInput
              label="email"
              name="이메일 주소"
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
            <Heading size="sm">추가정보(선택)</Heading>
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
              <option value="남성" selected={getValues('gender') === '남성'}>
                남
              </option>
              <option value="여성" selected={getValues('gender') === '여성'}>
                여
              </option>
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
              {...register('ageRange')}
            >
              <option value="10대" selected={getValues('ageRange') === '10대'}>
                10대
              </option>
              <option value="20대" selected={getValues('ageRange') === '20대'}>
                20대
              </option>{' '}
              <option value="30대" selected={getValues('ageRange') === '30대'}>
                30대
              </option>
              <option value="40대" selected={getValues('ageRange') === '40대'}>
                40대
              </option>
              <option value="50대" selected={getValues('ageRange') === '50대'}>
                50대
              </option>
              <option value="60대" selected={getValues('ageRange') === '60대'}>
                60대
              </option>
            </Select>
          </FormControl>
        </VStack>
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

export default Edit;

const ErrorStyle = {
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FF001A',
  pt: '10px',
};
