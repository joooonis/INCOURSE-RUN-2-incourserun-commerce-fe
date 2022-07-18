import { Path, UseFormRegister } from 'react-hook-form';

import { InputProps } from '@chakra-ui/react';

interface Options {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface FormValues {
  avatar: File;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  agreeAllTerms: boolean;
  requiredTerms: boolean;
  privateInfoTerms: boolean;
  marketingTerms: boolean;
  isRegister: boolean;
}
export interface JoinInputProps extends InputProps {
  label: Path<FormValues>;
  name: string;
  register: UseFormRegister<FormValues>;
  options?: Options;
}

export type UserType = {
  avatar: File;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
};
