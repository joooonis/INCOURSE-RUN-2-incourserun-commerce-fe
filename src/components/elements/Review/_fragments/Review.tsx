import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Textarea,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

import PrimaryButton from '@components/common/Button/Button';
import { ReviewModal } from '@components/elements/Modal';
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
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) router.replace('/login');
  }, []);
  const [products, setProducts] = useState<ProductType[]>([]);
  const { id, createdAt, product, quantity, isfreedelivery } = router.query;

  const { register, handleSubmit, setValue } = useForm<ReviewFormValues>();

  const [year, month, date] = [
    createdAt?.slice(0, 4),
    createdAt?.slice(4, 6),
    createdAt?.slice(6, 8),
  ];

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

  const attachImgRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState(attachImgRef.current?.files);
  const [preview, setPreview] = useState<PreviewsType>();

  const handleAttachImg = (e: React.MouseEvent) => {
    console.log(e);
    e.preventDefault();
    if (attachImgRef.current) {
      attachImgRef.current.click();
    }
  };

  const handleImgOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (attachImgRef.current?.files) {
      setImg(attachImgRef.current?.files);
      const files = attachImgRef.current?.files;

      if (files && files[0] && files[1] && files[2]) {
        setPreview({
          preview1: URL.createObjectURL(files[0]),
          preview2: URL.createObjectURL(files[1]),
          preview3: URL.createObjectURL(files[2]),
        });
      } else if (files && files[0] && files[1]) {
        setPreview({
          preview1: URL.createObjectURL(files[0]),
          preview2: URL.createObjectURL(files[1]),
        });
      } else if (files && files[0]) {
        setPreview({
          preview1: URL.createObjectURL(files[0]),
        });
      }
    }
  };

  const postReview = async (data: ReviewFormValues) => {
    const buildFormDate = (data: ReviewFormValues) => {
      const formData = new FormData();
      formData.append('orderProduct', String(data.orderProduct));
      formData.append('user', String(data.user));
      formData.append('content', data.content);
      formData.append('rating', String(data.rating));
      if (img) {
        formData.append('imgs', img[0]);
        formData.append('imgs', img[1]);
        formData.append('imgs', img[2]);
      }
      return formData;
    };

    const formData = await buildFormDate(data);

    instance.post('/v1/reviews', formData).then((res) => {
      console.log(res);
      onOpen();
    });
  };

  useEffect(() => {
    instance.get('/v1/products').then((res) => setProducts(res.data));
    setValue('rating', 0); // 별점 초기화
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (products) {
    setValue('orderProduct', Number(id));
    setValue('user', 1);
    const targetProduct = findProduct(products, Number(product));
    return (
      <>
        <ReviewModal isOpen={isOpen} onClose={onClose}></ReviewModal>
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
                  border={preview?.preview1 ? 'none' : '2px dashed #CBCED6'}
                  borderRadius="5px"
                  position="relative"
                >
                  {preview?.preview1 ? (
                    <Box>
                      <Image src={preview.preview1}></Image>
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
                {preview?.preview2 && (
                  <Box
                    w="80px"
                    h="80px"
                    border={preview?.preview2 ? 'none' : '2px dashed #CBCED6'}
                    borderRadius="5px"
                    position="relative"
                  >
                    <Box>
                      <Image src={preview.preview2}></Image>
                    </Box>
                  </Box>
                )}
                {preview?.preview3 && (
                  <Box
                    w="80px"
                    h="80px"
                    border={preview?.preview3 ? 'none' : '2px dashed #CBCED6'}
                    borderRadius="5px"
                    position="relative"
                  >
                    <Box>
                      <Image src={preview.preview3}></Image>
                    </Box>
                  </Box>
                )}
              </HStack>
              <Input
                display="none"
                type="file"
                multiple
                accept="image/*"
                ref={attachImgRef}
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
