import { useDispatch } from 'react-redux';

import { Button, Text, VStack } from '@chakra-ui/react';

import { decrement, increment } from '@features/Count/counterSlice';

import { useRootState } from '@components/hooks/useRootState';

const Content = () => {
  const dispatch = useDispatch();
  const { value } = useRootState((state) => state.COUNTER);

  return (
    <VStack>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Text>{value}</Text>
      <Button onClick={() => dispatch(decrement())}>-</Button>
    </VStack>
  );
};

export default Content;
