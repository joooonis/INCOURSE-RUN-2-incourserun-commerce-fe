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

import { phoneNumber, validateWithByte } from '@components/hooks';

import { getToken } from '@utils/localStorage/token';

import JoinInput from './JoinInput';
import { FormValues } from './types';

function Join() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormValues>();

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);
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
    const patchData = { ...data };
    patchData.isRegister = true;

    if (
      (img && data.agreeAllTerms) ||
      (img && data.requiredTerms && data.privateInfoTerms)
    ) {
      instance.patch('/v1/users/me', patchData);

      const formData = new FormData();
      formData.append('avatar', img[0]);
      instance.patch('/v1/users/me', formData);
      router.replace('join/success');
    } else if (
      data.agreeAllTerms ||
      (data.requiredTerms && data.privateInfoTerms)
    ) {
      instance.patch('/v1/users/me', patchData);
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

  const [phone, setPhone] = useState<string>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(phoneNumber(event.target.value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={0} alignItems="flex-start">
        <Box>
          <Heading size="lg">????????????</Heading>
        </Box>
        <Box pt="60px">
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
            <JoinInput
              label="name"
              name="??????"
              register={register}
              options={{
                required: true,
                minLength: 2,
              }}
            ></JoinInput>
            {errors.name && (
              <Box {...ErrorStyle}>?????? 2??? ?????? ??????????????????.</Box>
            )}
          </FormControl>
          <FormControl>
            <JoinInput
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
            <JoinInput
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
            <JoinInput
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
            <Heading size="sm">??????????????????(??????)</Heading>
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
        <Box pt="81px" pb="44px">
          <Heading size="sm">??????????????????</Heading>
        </Box>
        <VStack w="full" spacing="42px" justify="space-between" align="cener">
          <Flex
            justify="space-between"
            borderBottom="2px solid #FF710B"
            pb="7px"
          >
            <Text color="primary.500" fontSize="16px" fontWeight="700">
              ?????? ????????? ?????? ???????????????.
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
                ????????? ????????? ?????? ???????????? ??????
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
                ?????????????????? ??? ??????, ??? 3??? ?????? ??????
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
                ????????? ?????? ?????? ??? ????????? ?????? ??????(??????)
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
            ???????????? ??????
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
