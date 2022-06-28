import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import priceToString from '@components/hooks/priceToString';

import { SERVER_URL } from '../../urls';

interface Detail {
  avgRating: number;
  name: string;
  id: number;
  capacity: number;
  price: number;
  description?: string;
  detailImg?: string;
  productImg?: string;
  reviewCount: number;
}

function Detail() {
  const router = useRouter();
  const [detail, setDetail] = useState<Detail | null>(null);

  const url = SERVER_URL.NEW + '/v1/products';
  const id = Number(router.query.id);

  useEffect(() => {
    if (id && id > 0) {
      axios.get(`${url}/${id}`).then((res) => {
        setDetail(res.data);
      });
    }
  }, [id]);
  return (
    <Box pt="120px" pb="80px">
      {detail && (
        <>
          <Flex justify="center" position="relative">
            <Image zIndex="1" src={detail.productImg} w="343px" h="300px" />
            <Image
              position="absolute"
              src="/images/product/bg.png"
              w="343px"
              h="300px"
            />
          </Flex>
          <VStack
            w="full"
            spacing={0}
            borderTopRadius="20px"
            boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
            alignItems="flex-start"
            px="16px"
          >
            <Box {...TitleText} pt="45px">
              {detail.name}
              <span
                style={{
                  paddingLeft: '5px',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '29px',
                  color: '#8C919F',
                }}
              >
                {detail.capacity}ml
              </span>
            </Box>
            <Box {...PriceText} pt="14px">
              {priceToString(detail.price)}
              <span
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '29px',
                  color: 'black',
                }}
              >
                원
              </span>
            </Box>
            <Box {...FreeDeliveryText}>
              3만원 이상 구매시
              <span
                style={{
                  color: '#FF710B',
                }}
              >
                &nbsp;무료배송
              </span>
            </Box>
            <Box {...SubText} pt="10px">
              {detail.description}
            </Box>
            {detail.avgRating?.toFixed(1) !== '0.0' && (
              <Flex {...BoldText} alignItems="center" pt="10px" pb="15px">
                <Image
                  src="/icons/svg/product/star.svg"
                  w="10px"
                  h="10px"
                  alt="star"
                  mr="8px"
                />
                {detail.avgRating.toFixed(1)}
                <span
                  style={{
                    paddingLeft: '5px',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '28px',
                    color: '#8C919F',
                  }}
                >
                  ({detail.reviewCount}개 리뷰)
                </span>
              </Flex>
            )}
            <Flex
              flexDir="column"
              justify="space-between"
              w="100%"
              h="120px"
              py="4px"
            >
              <Button {...ButtonStyle} variant="outline" colorScheme="primary">
                장바구니
              </Button>
              <Button {...ButtonStyle} colorScheme="primary">
                바로구매
              </Button>
            </Flex>
            <Flex w="full" h="80px" justify="space-around" alignItems="center">
              <Box {...BoldText} color="primary.500">
                상세정보
              </Box>
              <Box {...BoldText} fontWeight="400" color="gray.600">
                구매정보
              </Box>
              <Box {...BoldText} fontWeight="400" color="gray.600">
                리뷰 (78)
              </Box>
            </Flex>
          </VStack>
          <Box maxH="477px" overflow="hidden">
            <Image src={detail.detailImg} alt="cream" />
          </Box>
          <Accordion defaultIndex={[1]} allowMultiple>
            <AccordionItem borderWidth={0}>
              {({ isExpanded }) => (
                <>
                  <AccordionPanel px={0} pb="20px" pt={0} overflow="hidden">
                    <Image
                      src={detail.detailImg}
                      alt="cream"
                      marginTop="-477px"
                    />
                  </AccordionPanel>
                  <Box px="16px">
                    <AccordionButton
                      {...ButtonStyle}
                      _expanded={{ border: '1px solid black' }}
                      border="1px solid black"
                    >
                      {isExpanded ? (
                        <Box {...BoldText} flex="1">
                          상세정보 접기
                          <AccordionIcon />
                        </Box>
                      ) : (
                        <Box {...BoldText} flex="1">
                          상세정보 펼처보기
                          <AccordionIcon />
                        </Box>
                      )}
                    </AccordionButton>
                  </Box>
                </>
              )}
            </AccordionItem>
          </Accordion>
          <Accordion defaultIndex={[1]} allowMultiple pt="25px">
            <AccordionItem>
              <Box>
                <AccordionButton py="15.5px">
                  <Box {...BoldText} flex="1" textAlign="left">
                    주문 및 배송 안내
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Box>
              <AccordionPanel px="16px" pt="15px" pb="20px">
                <Box {...BoldText}>[주문 및 배송 안내]</Box>
                <VStack spacing="10px" alignItems="flex-start" py="20px">
                  <Box {...SubText}>배송방법 : 인코스런 택배</Box>
                  <Box {...SubText}>배송지역 : 전국</Box>
                  <Box {...SubText}>
                    <Text> 배송비용 : 단품 상품 구매 시 3,000배송비 발생</Text>
                    <Text pl="71px">
                      그외 단품 묶음 구매의 경우 30,000원 이상 구매 시 무료배송
                    </Text>
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Box h="30px">여기는 리뷰입니다.</Box>
        </>
      )}
    </Box>
  );
}

export default Detail;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const PriceText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'primary.500',
};

const FreeDeliveryText = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const SubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const BoldText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const ButtonStyle = {
  w: 'full',
  h: '50px',
  borderRadius: '25px',
  size: 'sd',
  py: '12px',
};
