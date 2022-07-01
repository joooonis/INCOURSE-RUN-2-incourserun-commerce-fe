import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import priceToString from '@components/hooks/priceToString';

import { SingleOrderProps } from './types';

function SingleOrder({
  product,
  quantity,
  shippingStatus,
  hasReview,
}: SingleOrderProps) {
  return (
    <>
      <Flex py="10px" justify="space-between" alignItems="center">
        <Flex>
          <Image
            src="/images/order/product.png"
            w="60px"
            h="60px"
            mr="10px"
          ></Image>
          <VStack spacing={0} alignItems="flex-start">
            <Box {...TitleText}>{product.name}</Box>
            <Box {...SubText}>
              {product.name} | {product.capacity}ml
            </Box>
            <Box {...TitleText} color="primary.500">
              {priceToString(product.price * quantity)}원 / {quantity}개
            </Box>
          </VStack>
        </Flex>
        <VStack spacing={0} alignItems="flex-end">
          <Box {...TitleText} color="primary.500">
            {shippingStatus}
          </Box>
          <Box {...SubText} color="#1A1A1A">
            배송비 2,500원
          </Box>
        </VStack>
      </Flex>
      {shippingStatus === '결제완료' && (
        <Flex w="full" pt="10px" pb="21px" justify="flex-end">
          <Button
            borderRadius="5px"
            w="140px"
            h="40px"
            p="0px 15px"
            colorScheme="primary"
            {...TitleText}
          >
            주문취소
          </Button>
        </Flex>
      )}
      {shippingStatus === '배송완료' && !hasReview && (
        <Flex w="full" pt="10px" pb="21px" justify="flex-end">
          <Button
            borderRadius="5px"
            w="140px"
            h="40px"
            p="0px 15px"
            colorScheme="primary"
            variant="outline"
            {...TitleText}
          >
            리뷰작성
          </Button>
        </Flex>
      )}
    </>
  );
}

export default SingleOrder;

const TitleText = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: 'gray.700',
};

const TabStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.400',
};

const InputTitleStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
