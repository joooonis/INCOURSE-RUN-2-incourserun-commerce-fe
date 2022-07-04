import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import PrimaryButton from '@components/common/Button/Button';
import { SERVER_URL } from '@components/elements/urls';
import { findProduct, priceToString } from '@components/hooks';

import { ProductType, StarRatingProps } from './types';

function StarRating({ starRating, upStar, downStar }: StarRatingProps) {
  const rendering = () => {
    const result = [];
    for (let i = 0; i < starRating; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star.svg"
          w="24px"
          alt={String(i)}
          onClick={downStar}
          _hover={{ cursor: 'pointer' }}
        />,
      );
    }
    for (let i = starRating; i < 5; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star_gray.svg"
          w="24px"
          alt={String(i)}
          onClick={upStar}
          _hover={{ cursor: 'pointer' }}
        />,
      );
    }
    return result;
  };

  return (
    <HStack spacing="12px" w="full" py="28px" justify="center">
      {rendering()}
    </HStack>
  );
}

type ReviewFormValues = {
  user: number;
  orderProduct: number;
  rating: number;
  content: string;
  img: File;
  review: number;
};

function Review() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const { id, createdAt, product, quantity, isfreedelivery } = router.query;
  const year = createdAt?.slice(0, 4);
  const month = createdAt?.slice(4, 6);
  const date = createdAt?.slice(6, 8);

  const [starRating, setStarRating] = useState<number>(0);
  const upStar = () => {
    if (starRating < 5) {
      setStarRating((starRating: number) => starRating + 1);
      setValue('rating', starRating + 1);
    }
  };

  const downStar = () => {
    if (starRating > 0) {
      setStarRating((starRating: number) => starRating - 1);
      setValue('rating', starRating - 1);
    }
  };

  const { register, handleSubmit, setValue } = useForm<ReviewFormValues>();

  const postReview = (data: ReviewFormValues) => {
    console.log(data);
    axios.post(SERVER_URL.LOCAL + '/v1/reviews', data).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    axios
      .get(SERVER_URL.LOCAL + '/v1/products')
      .then((res) => setProducts(res.data));

    setValue('rating', 0); // 별점 초기화
  }, []);

  if (products) {
    setValue('review', 21);
    setValue('orderProduct', Number(id));
    const targetProduct = findProduct(products, Number(product));
    return (
      <>
        <Box pt="130px" px="16px" pb="50px">
          <Box {...TitleStyle} w="full">
            리뷰작성
          </Box>
          <Box h="80px"></Box>
          <Box {...TitleText} w="full" py="19px">
            [{year} - {month} - {date}]
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
                <Box {...TitleText}>{targetProduct?.name}</Box>
                <Box {...SubText}>
                  {targetProduct?.name} | {targetProduct?.capacity}ml
                </Box>
                <Box {...TitleText} color="primary.500">
                  {priceToString(targetProduct?.price * Number(quantity))}원 /{' '}
                  {quantity}개
                </Box>
              </VStack>
            </Flex>
            <VStack spacing={0} alignItems="flex-end">
              <Box {...TitleText} color="primary.500">
                배송완료
              </Box>
              {isfreedelivery ? (
                <Box {...SubText} color="#1A1A1A">
                  무료배송
                </Box>
              ) : (
                <Box {...SubText} color="#1A1A1A">
                  배송비 3,000원
                </Box>
              )}
            </VStack>
          </Flex>
          <Box w="full" bg="gray.100" my="20px" h="10px"></Box>
          <form onSubmit={handleSubmit(async (data) => await postReview(data))}>
            {' '}
            <VStack spacing={0} align="flex-start">
              <Box {...InputTitleStyle} py="20px">
                별점
              </Box>
              <StarRating
                starRating={starRating}
                upStar={upStar}
                downStar={downStar}
              />
              {/* <Input
                display="hidden"
                value={starRating}
                {...register('rating')}
              /> */}
              <Box {...InputTitleStyle} pt="40px" pb="20px">
                내용
              </Box>
              <Textarea
                variant="flushed"
                placeholder="내용을 작성하세요."
                _focus={{ borderBottom: '2px solid #4A4D55' }}
                rows={10}
                resize="none"
                {...register('content')}
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
              <Input type="file" accept="image/*" {...register('img')}></Input>
              <PrimaryButton type="submit">작성하기</PrimaryButton>
            </VStack>
          </form>
        </Box>
      </>
    );
  } else return <></>;
}

export default Review;

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

const InputTitleStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
