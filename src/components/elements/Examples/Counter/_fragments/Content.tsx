import { useDispatch } from 'react-redux';

import { Button, HStack, Text, VStack } from '@chakra-ui/react';

import { decrement, increment } from '@features/Count/counterSlice';
import { addItem, removeItem } from '@features/Item/itemSlice';

import { useRootState } from '@components/hooks/useRootState';

const Content = () => {
  const dispatch = useDispatch();
  const { value } = useRootState((state) => state.COUNTER);
  const { itemCheckers } = useRootState((state) => state.ITEM);
  console.log(itemCheckers);

  return (
    <VStack pt="130px">
      {' '}
      <HStack>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Text>{value}</Text>
        <Button onClick={() => dispatch(decrement())}>-</Button>
      </HStack>
      <HStack>
        <Button onClick={() => dispatch(addItem(1))}>+1</Button>
        <Button onClick={() => dispatch(addItem(2))}>+2</Button>
        <Text>{itemCheckers}</Text>
        <Button onClick={() => dispatch(removeItem(1))}>-1</Button>
        <Button onClick={() => dispatch(removeItem(2))}>-2</Button>
      </HStack>
    </VStack>
  );
};

export default Content;
