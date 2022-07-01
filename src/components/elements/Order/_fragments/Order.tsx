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

import PrimaryButton from '@components/common/Button/Button';
import priceToString from '@components/hooks/priceToString';

function Order() {
  return (
    <>
      <Box pt="130px" px="16px" pb="50px">
        <Box {...TitleStyle} w="full">
          주문내역
        </Box>
        <Box h="80px"></Box>
        <Tabs variant="unstyled" size="sm">
          <TabPanels>
            <TabPanel px={0} py={0}>
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
            <TabPanel px={0} py={0}>
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
            <TabPanel px={0} py={0}>
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
          <TabList
            py="30px"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
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
      <Box pt="130px" px="16px" pb="50px">
        <Box {...TitleStyle} w="full">
          리뷰작성
        </Box>
        <Box h="80px"></Box>
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
        <Box w="full" bg="gray.100" my="20px" h="10px"></Box>
        <VStack spacing={0} align="flex-start">
          <Box {...InputTitleStyle} py="20px">
            별점
          </Box>
          <HStack spacing="12px" w="full" py="28px" justify="center">
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star1" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star2" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star3" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star4" />
            <Image src="icons/svg/review/star_gray.svg" w="24px" alt="star5" />
          </HStack>
          <Box {...InputTitleStyle} pt="40px" pb="20px">
            내용
          </Box>
          <Textarea
            variant="flushed"
            placeholder="내용을 작성하세요."
            _focus={{ borderBottom: '2px solid #4A4D55' }}
            rows={10}
            resize="none"
          />
          <Box {...InputTitleStyle} pt="20px">
            사진첨부 (0/3)
          </Box>
          <HStack spacing="20px" pt="30px" justify="flex-start">
            <Box
              w="80px"
              h="80px"
              border="2px dashed #CBCED6"
              borderRadius="5px"
              position="relative"
            >
              <Box
                _before={{
                  content: '""',
                  display: 'block',
                  width: '2px',
                  height: '18px',
                  backgroundColor: '#CBCED6',
                  borderRadius: '2px',
                  position: 'absolute',
                  top: '29px',
                  left: '37px',
                }}
                _after={{
                  content: '""',
                  display: 'block',
                  height: '2px',
                  width: '18px',
                  backgroundColor: '#CBCED6',
                  borderRadius: '2px',
                  position: 'absolute',
                  top: '37px',
                  left: '29px',
                }}
                _hover={{ cursor: 'pointer' }}
              ></Box>
            </Box>
            <Box
              w="80px"
              h="80px"
              border="2px dashed #CBCED6"
              borderRadius="5px"
            ></Box>
            <Box
              w="80px"
              h="80px"
              border="2px dashed #CBCED6"
              borderRadius="5px"
            ></Box>
          </HStack>

          <Input type="file" display="hidden"></Input>
          <PrimaryButton>작성하기</PrimaryButton>
        </VStack>
      </Box>
    </>
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

const InputTitleStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
