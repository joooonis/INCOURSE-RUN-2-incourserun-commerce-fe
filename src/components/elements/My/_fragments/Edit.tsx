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
import { phoneNumber, validateWithByte } from '@components/hooks';

import { getToken } from '@utils/localStorage/token';

import EditInput from './EditInput';
import { FormValues } from './types';

function Edit() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
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
      const user = res.data;
      if (user.name) setValue('name', user.name);
      if (user.nickname) setValue('nickname', user.nickname);
      if (user.email) setValue('email', user.email);
      if (user.phone) setValue('phone', user.phone);
      if (user.gender) setValue('gender', user.gender);
      if (user.ageRange) setValue('ageRange', user.ageRange);
      if (user.avatar) setPreview(user.avatar);
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
      });
    } else if (data) {
      instance.patch('/v1/users/me', data).then(() => {
        onOpen();
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [phone, setPhone] = useState<string>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(phoneNumber(event.target.value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditModal isOpen={isOpen} onClose={onClose} />
      <VStack spacing={0} alignItems="flex-start" pt="130px" px="16px">
        <Box>
          <Heading size="sm">??????????????????</Heading>
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
              name="??????"
              register={register}
              options={{
                required: true,
                minLength: 2,
              }}
            ></EditInput>
            {errors.name && (
              <Box {...ErrorStyle}>?????? 2??? ?????? ??????????????????.</Box>
            )}
          </FormControl>
          <FormControl>
            <EditInput
              label="nickname"
              name="?????????"
              register={register}
              options={{
                required: true,
                validate: (nickname: string) => validateWithByte(nickname),
              }}
            />
            {errors.nickname && (
              <Box {...ErrorStyle}>
                ?????? 1~5???, ?????? ??? ?????? 2~10??? ????????? ??????????????????.
              </Box>
            )}
          </FormControl>
          <FormControl>
            <EditInput
              label="phone"
              name="????????? ??????"
              register={register}
              value={phone}
              options={{
                required: true,
                pattern: /^01([0|1|6|7|8|9])[-]\d{3,4}[-]\d{4}$/,
              }}
              onChange={onChange}
            />
            {errors.phone && (
              <Box {...ErrorStyle}>????????? ????????? ????????? ??????????????????.</Box>
            )}
          </FormControl>
          <FormControl>
            <EditInput
              label="email"
              name="????????? ??????"
              register={register}
              options={{
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              }}
            />
            {errors.email && (
              <Box {...ErrorStyle}>????????? ????????? ???????????? ??????????????????.</Box>
            )}
          </FormControl>
          <Box pt="60px">
            <Heading size="sm">????????????(??????)</Heading>
          </Box>
          <FormControl>
            <FormLabel fontSize="12px" color="primary.500">
              ??????
            </FormLabel>
            <Select
              variant="flushed"
              borderBottom="2px solid #CBCED6"
              _focus={{ borderBottom: '2px solid #FF710B' }}
              fontSize="16px"
              placeholder="????????? ???????????????"
              {...register('gender')}
            >
              <option value="??????" selected={getValues('gender') === '??????'}>
                ???
              </option>
              <option value="??????" selected={getValues('gender') === '??????'}>
                ???
              </option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="12px" color="primary.500">
              ?????????
            </FormLabel>
            <Select
              variant="flushed"
              borderBottom="2px solid #CBCED6"
              _focus={{ borderBottom: '2px solid #FF710B' }}
              fontSize="16px"
              placeholder="???????????? ???????????????"
              _selected={{ color: '#1A1A1A' }}
              {...register('ageRange')}
            >
              <option value="10???" selected={getValues('ageRange') === '10???'}>
                10???
              </option>
              <option value="20???" selected={getValues('ageRange') === '20???'}>
                20???
              </option>
              <option value="30???" selected={getValues('ageRange') === '30???'}>
                30???
              </option>
              <option value="40???" selected={getValues('ageRange') === '40???'}>
                40???
              </option>
              <option
                value="50??? ??????"
                selected={getValues('ageRange') === '50??? ??????'}
              >
                50??? ??????
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
            onClick={() => router.back()}
          >
            ??????
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
            ??????
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
