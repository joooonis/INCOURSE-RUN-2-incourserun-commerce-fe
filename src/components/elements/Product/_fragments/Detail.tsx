import React from 'react';

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
  VStack,
} from '@chakra-ui/react';

type Hashtag = {
  id: number;
  name: string;
};
interface DetailProps {
  name: string;
  capacity: number;
  price: number;
  hashtags?: Hashtag[];
  avgRating?: number;
  reviewCount?: number;
  description?: string;
}

function Detail({
  name,
  capacity,
  price,
  avgRating,
  reviewCount,
  description,
}: DetailProps) {
  return (
    <>
      <Box>
        <Flex justify="center" position="relative">
          <Image
            zIndex="1"
            src="/images/product/detail.png"
            w="343px"
            h="300px"
          />
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
            {name}
            <span
              style={{
                paddingLeft: '5px',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '29px',
                color: '#8C919F',
              }}
            >
              {capacity}ml
            </span>
          </Box>
          <Box {...PriceText} pt="14px">
            {price}
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
            {description}
          </Box>
          <Box {...BoldText} pt="10px" pb="15px">
            {avgRating}
            <span
              style={{
                paddingLeft: '5px',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '28px',
                color: '#8C919F',
              }}
            >
              ({reviewCount}개 리뷰)
            </span>
          </Box>
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
          <Image src="/images/product/lotion_detailed.png" alt="cream" />
        </Box>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem borderWidth={0}>
            {({ isExpanded }) => (
              <>
                <AccordionPanel px={0} pb="20px" pt={0} overflow="hidden">
                  <Image
                    src="/images/product/lotion_detailed.png"
                    alt="cream"
                    marginTop="-477px"
                  />
                </AccordionPanel>
                <Box px="16px">
                  <AccordionButton {...ButtonStyle} border="1px solid black">
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
      </Box>
    </>
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
