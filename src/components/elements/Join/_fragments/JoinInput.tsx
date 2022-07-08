import { Box, Input, Text } from '@chakra-ui/react';

import { JoinInputProps } from './types';

export default function JoinInput({
  label,
  name,
  placeholder,
  register,
  options,
  ...props
}: JoinInputProps) {
  return (
    <Box w="full">
      <Text {...NameStyle}>{name}</Text>
      <Input
        {...InputStyle}
        placeholder={placeholder}
        {...register(label, { ...options })}
        {...props}
      />
    </Box>
  );
}

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
const NameStyle = {
  fontSize: '12px',
  color: 'primary.500',
  fontWeight: 700,
  lineheight: '18px',
  pb: '10px',
};
