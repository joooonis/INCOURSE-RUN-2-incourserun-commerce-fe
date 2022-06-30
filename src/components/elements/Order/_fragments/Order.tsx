import {
  Box,
  Button,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';

import priceToString from '@components/hooks/priceToString';

function Order() {
  return (
    <Box pt="130px" pb="50px">
      <Box {...TitleStyle} w="full" px="16px">
        주문내역
      </Box>
      <Box h="80px"></Box>
      <Tabs variant="unstyled" size="sm">
        <TabPanels>
          <TabPanel py={0}>
            <Box {...TitleText} w="full" py="19px">
              [2021 - 04 - 01]
            </Box>
            <Flex py="10px" justify="space-between" alignItems="center">
              <Flex>
                <Image
                  src="/images/order/product.png"
                  w="60px"
                  h="60px"
                  mr="10px"
                ></Image>
                <VStack spacing={0} alignItems="flex-start">
                  <Box {...TitleText}>샴푸 & 바디</Box>
                  <Box {...SubText}>샴푸 & 바디 | 120ml</Box>
                  <Box {...TitleText} color="primary.500">
                    {priceToString(27000)}원 / 1개
                  </Box>
                </VStack>
              </Flex>
              <VStack spacing={0} alignItems="flex-end">
                <Box {...TitleText} color="primary.500">
                  결제완료
                </Box>
                <Box {...SubText} color="#1A1A1A">
                  배송비 2,500원
                </Box>
              </VStack>
            </Flex>
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
          </TabPanel>
          <TabPanel py={0}>
            <Box {...TitleText} w="full" py="19px">
              [2021 - 03 - 21]
            </Box>
            <Flex py="10px" justify="space-between" alignItems="center">
              <Flex>
                <Image
                  src="/images/order/product.png"
                  w="60px"
                  h="60px"
                  mr="10px"
                ></Image>
                <VStack spacing={0} alignItems="flex-start">
                  <Box {...TitleText}>샴푸 & 바디</Box>
                  <Box {...SubText}>샴푸 & 바디 | 120ml</Box>
                  <Box {...TitleText} color="primary.500">
                    {priceToString(27000)}원 / 1개
                  </Box>
                </VStack>
              </Flex>
              <VStack spacing={0} alignItems="flex-end">
                <Box {...TitleText} color="primary.500">
                  상품준비
                </Box>
                <Box {...SubText} color="#1A1A1A">
                  무료배송
                </Box>
              </VStack>
            </Flex>
            <Flex py="10px" justify="space-between" alignItems="center">
              <Flex>
                <Image
                  src="/images/order/product.png"
                  w="60px"
                  h="60px"
                  mr="10px"
                ></Image>
                <VStack spacing={0} alignItems="flex-start">
                  <Box {...TitleText}>샴푸 & 바디</Box>
                  <Box {...SubText}>샴푸 & 바디 | 120ml</Box>
                  <Box {...TitleText} color="primary.500">
                    {priceToString(27000)}원 / 1개
                  </Box>
                </VStack>
              </Flex>
              <VStack spacing={0} alignItems="flex-end">
                <Box {...TitleText} color="primary.500">
                  배송중
                </Box>
                <Box {...SubText} color="#1A1A1A">
                  배송비 2,500원
                </Box>
              </VStack>
            </Flex>
          </TabPanel>
          <TabPanel py={0}>
            <Box {...TitleText} w="full" py="19px">
              [2021 - 03 - 11]
            </Box>
            <Flex py="10px" justify="space-between" alignItems="center">
              <Flex>
                <Image
                  src="/images/order/product.png"
                  w="60px"
                  h="60px"
                  mr="10px"
                ></Image>
                <VStack spacing={0} alignItems="flex-start">
                  <Box {...TitleText}>샴푸 & 바디</Box>
                  <Box {...SubText}>샴푸 & 바디 | 120ml</Box>
                  <Box {...TitleText} color="primary.500">
                    {priceToString(27000)}원 / 1개
                  </Box>
                </VStack>
              </Flex>
              <VStack spacing={0} alignItems="flex-end">
                <Box {...TitleText} color="primary.500">
                  배송완료
                </Box>
                <Box {...SubText} color="#1A1A1A">
                  무료배송
                </Box>
              </VStack>
            </Flex>
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
          </TabPanel>
        </TabPanels>
        <TabList px="16px" py="30px" justifyContent="center">
          <Tab {...TabStyle} _selected={{ color: '#1A1A1A' }}>
            1
          </Tab>
          <Tab {...TabStyle} _selected={{ color: '#1A1A1A' }}>
            2
          </Tab>
          <Tab {...TabStyle} _selected={{ color: '#1A1A1A' }}>
            3
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}

export default Order;

const TitleStyle = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

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
