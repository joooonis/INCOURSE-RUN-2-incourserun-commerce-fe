import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
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

import {
  PreviewsType,
  ProductType,
  ReviewFormValues,
  StarRatingProps,
} from './types';

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

  const postReview = async (data: ReviewFormValues) => {
    console.log(data);
  };

  useEffect(() => {
    axios
      .get(SERVER_URL.LOCAL + '/v1/products')
      .then((res) => setProducts(res.data));
    setValue('rating', 0); // 별점 초기화
  }, []);

  const [imgPreview, setImgPreview] = useState<PreviewsType>();

  const attachImg = useRef<HTMLInputElement>(null);
  const handleAttachImg = (e: any) => {
    e.preventDefault();
    if (attachImg.current) {
      attachImg.current.click();
    }
  };

  const handleImgOnChange = (e: any) => {
    e.preventDefault();
    if (attachImg.current?.files) {
      setImg(attachImg.current?.files);
    }
  };

  const [img, setImg] = useState(attachImg.current?.files);

  useEffect(() => {
    if (img && img[0] && img[1] && img[2]) {
      2;
      const file0 = img[0];
      const file1 = img[1];
      const file2 = img[2];

      setImgPreview({
        preview1: URL.createObjectURL(file0),
        preview2: URL.createObjectURL(file1),
        preview3: URL.createObjectURL(file2),
      });
    } else if (img && img[0] && img[1]) {
      const file0 = img[0];
      const file1 = img[1];
      setImgPreview({
        preview1: URL.createObjectURL(file0),
        preview2: URL.createObjectURL(file1),
      });
    } else if (img && img[0]) {
      const file0 = img[0];
      setImgPreview({
        preview1: URL.createObjectURL(file0),
      });
    }
  }, [img]);

  if (products) {
    setValue('orderProduct', Number(id));
    setValue('user', 1);
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
                사진첨부 ({img?.length ? img?.length : 0}/3)
              </Box>
              <HStack spacing="20px" pt="30px" pb="100px" justify="flex-start">
                <Box
                  w="80px"
                  h="80px"
                  border={imgPreview?.preview1 ? 'none' : '2px dashed #CBCED6'}
                  borderRadius="5px"
                  position="relative"
                >
                  {imgPreview?.preview1 ? (
                    <Box>
                      <Image src={imgPreview.preview1}></Image>
                    </Box>
                  ) : (
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
                      onClick={handleAttachImg}
                    ></Box>
                  )}
                </Box>
                {imgPreview?.preview2 && (
                  <Box
                    w="80px"
                    h="80px"
                    border={
                      imgPreview?.preview2 ? 'none' : '2px dashed #CBCED6'
                    }
                    borderRadius="5px"
                    position="relative"
                  >
                    <Box>
                      <Image src={imgPreview.preview2}></Image>
                    </Box>
                  </Box>
                )}
                {imgPreview?.preview3 && (
                  <Box
                    w="80px"
                    h="80px"
                    border={
                      imgPreview?.preview3 ? 'none' : '2px dashed #CBCED6'
                    }
                    borderRadius="5px"
                    position="relative"
                  >
                    <Box>
                      <Image src={imgPreview.preview3}></Image>
                    </Box>
                  </Box>
                )}
              </HStack>
              <Input
                display="none"
                type="file"
                multiple
                accept="image/*"
                ref={attachImg}
                onChange={handleImgOnChange}
                // {...register('photos')}
              ></Input>
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
