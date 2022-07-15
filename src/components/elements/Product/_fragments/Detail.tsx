import { useRouter } from 'next/router';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

import { CartModal } from '@components/elements/Modal';
import { priceToString } from '@components/hooks';

import reviewAnalysis from './reviewAnalysis';
import {
  DetailType,
  ReviewType,
  SingleReviewProps,
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
          w="10px"
          alt={String(i)}
          onClick={downStar}
        />,
      );
    }
    for (let i = starRating; i < 5; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star_gray.svg"
          w="10px"
          alt={String(i)}
          onClick={upStar}
        />,
      );
    }
    return result;
  };

  return (
    <HStack spacing="6px" justify="center">
      {rendering()}
    </HStack>
  );
}

function SingleReview({ review }: SingleReviewProps) {
  const year = review.createdAt.slice(0, 4);
  const month = review.createdAt.slice(5, 7);
  const date = review.createdAt.slice(8, 10);

  const yearReply = review.reply?.createdAt.slice(0, 4);
  const monthReply = review.reply?.createdAt.slice(5, 7);
  const dateReply = review.reply?.createdAt.slice(8, 10);
  return (
    <>
      <VStack spacing={0} pt="23px" pb="25px" w="full">
        <Flex w="full" justify="space-between">
          <Box {...ReviewrStyle}>incourse.run</Box>
          <StarRating starRating={review.rating} />
        </Flex>
        <Box {...ReviewDateStyle} w="full">
          {year}.{month}.{date}
        </Box>
        <Box {...ReviewContentStyle} w="full" pt="17px">
          {review.content}
        </Box>
        <HStack spacing="10px" w="full" justify="flex-start" pt="9px">
          {review.photos.map((photo) => (
            <Image
              key={photo.id}
              borderRadius="5px"
              w="80px"
              h="80px"
              src={photo.img}
            ></Image>
          ))}
        </HStack>
      </VStack>
      {review.reply && (
        <Flex w="full" pt="6px" pb="30px">
          <Box pr="9px">
            <Image src="/icons/svg/review/reply.svg" />
          </Box>
          <VStack spacing={0}>
            <Flex w="full" justify="space-between">
              <Box {...ReviewrStyle}>인코스런 관리자</Box>
            </Flex>
            <Box {...ReviewDateStyle} w="full">
              {yearReply}.{monthReply}.{dateReply}
            </Box>
            <Box {...ReviewContentStyle} w="full" pt="20px">
              {review.reply.content}
            </Box>
          </VStack>
        </Flex>
      )}
    </>
  );
}
interface ReviewChartBarProps {
  countAll: number;
  count: number;
}

function ReviewChartBar({ countAll, count }: ReviewChartBarProps) {
  const height = 50 * (count / countAll);
  return (
    <>
      <Box
        w="10px"
        h="50px"
        borderTopRadius="5px"
        bg="#FFF8E7"
        position="relative"
      >
        <Box
          w="10px"
          h={height}
          borderTopRadius="5px"
          bg="#FF710B"
          position="absolute"
          bottom={0}
          zIndex={1}
        ></Box>
      </Box>
    </>
  );
}

function Detail() {
  const router = useRouter();
  const [detail, setDetail] = useState<DetailType | null>(null);
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [ratingCounts, setRatingCounts] = useState<number[]>();
  const id = Number(router.query.id);

  useEffect(() => {
    if (id && id > 0) {
      instance.get(`/v1/products/${id}`).then((res) => setDetail(res.data));

      instance
        .get('/v1/reviews', {
          params: { product: id, ordering: 'created_at' },
        })
        .then((res) => {
          setReviews(res.data.results);
          setRatingCounts(reviewAnalysis(res.data.results));
        });
    }
  }, [id]);

  const [ordering, setOrdering] = useState('created_at');
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);

  const handleOrderingOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setOrdering(e.target.value);
    }
  };

  const handleHasPhotoOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setHasPhoto((hasPhoto) => !hasPhoto);
    }
  };

  useEffect(() => {
    if (id && id > 0 && hasPhoto) {
      instance
        .get('/v1/reviews', {
          params: { product: id, ordering: ordering, has_photo: true },
        })
        .then((res) => setReviews(res.data.results));
    } else if (id && id > 0 && !hasPhoto) {
      instance
        .get('/v1/reviews', {
          params: { product: id, ordering: ordering },
        })
        .then((res) => setReviews(res.data.results));
    }
  }, [ordering, hasPhoto]);

  const [quantity, setQunatity] = useState(1);
  const decQuantity = () => {
    if (quantity > 1) {
      setQunatity((quantity: number) => quantity - 1);
    }
  };

  const incQuantity = () => {
    if (quantity < 10) {
      setQunatity((quantity: number) => quantity + 1);
    }
  };

  const postCart = () => {
    instance
      .post('/v1/carts', {
        user: 1,
        product: detail?.id,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res);
        onClose();
        ModalOpen();
      });
  };

  const SendQuery = () => {
    Router.push({
      pathname: '/order/payment',
      query: {
        product: detail?.id,
        quantity: quantity,
      },
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: ModalOpen,
    onClose: ModalClose,
  } = useDisclosure();

  return (
    <Box pt="120px" pb="80px">
      {detail && (
        <>
          <Box>
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
                  {' '}
                  무료배송
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
                <Button
                  {...ButtonStyle}
                  variant="outline"
                  colorScheme="primary"
                  onClick={onOpen}
                >
                  장바구니
                </Button>
                <Button {...ButtonStyle} colorScheme="primary" onClick={onOpen}>
                  바로구매
                </Button>
              </Flex>
              <Flex
                w="full"
                h="80px"
                justify="space-around"
                alignItems="center"
              >
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
                      <Text>
                        배송비용 : 단품 상품 구매 시 3,000원 배송비 발생
                      </Text>
                      <Text pl="71px">
                        그외 단품 묶음 구매의 경우 30,000원 이상 구매 시
                        무료배송
                      </Text>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Box px="16px">
            <HStack pt="51px" pb="30px" justify="space-between">
              <Box {...ReviewCountStyle}>
                리뷰 <span style={{ color: '#FF710B' }}>{reviews?.length}</span>
                건
              </Box>
              <HStack spacing="10px">
                <Select
                  {...ReviewButtonStyle}
                  w="115px"
                  h="30px"
                  bg="gray.200"
                  borderRadius="5px"
                  border="1px solid red"
                  onChange={handleOrderingOnChange}
                  defaultValue="created_at"
                >
                  <option value="created_at">최신순</option>
                  <option value="-rating">평점 높은 순</option>
                  <option value="rating">평점 낮은 순</option>
                </Select>
                <Select
                  {...ReviewButtonStyle}
                  w="100px"
                  h="30px"
                  bg="gray.200"
                  borderRadius="5px"
                  border="1px solid red"
                  onChange={handleHasPhotoOnChange}
                  defaultValue="전체보기"
                >
                  <option value="false">전체보기</option>
                  <option value="true">포토리뷰</option>
                </Select>
              </HStack>
            </HStack>
            <Flex justify="space-between" alignItems="center" pb="21px">
              <HStack spacing={0}>
                <Box
                  {...BoldText}
                  bg="primary.500"
                  p="0px 7px"
                  ml="6px"
                  mr="12px"
                  borderRadius="15px"
                  color="white"
                >
                  {detail.avgRating?.toFixed(1)}
                </Box>
                <StarRating
                  starRating={Number(detail.avgRating?.toFixed(1))}
                ></StarRating>
              </HStack>
              <Box w="1px" h="70px" bg="gray.200"></Box>
              <VStack spacing={0} alignItems="center">
                <HStack spacing="23px">
                  {reviews &&
                    ratingCounts &&
                    ratingCounts.map((count, index) => {
                      return (
                        <ReviewChartBar
                          key={index}
                          count={count}
                          countAll={reviews?.length}
                        />
                      );
                    })}
                </HStack>
                <Box w="150px" h="1px" bg="gray.200"></Box>
                <HStack
                  {...ChartStyle}
                  spacing="15px"
                  mt="4px"
                  color="gray.600"
                >
                  <Box>5점</Box>
                  <Box>4점</Box>
                  <Box>3점</Box>
                  <Box>2점</Box>
                  <Box>1점</Box>
                </HStack>
              </VStack>
            </Flex>

            {reviews &&
              reviews.map((review) => (
                <SingleReview key={review.id} review={review} />
              ))}
          </Box>
          <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg="transparent">
              <DrawerBody px="16px" py="20px" bg="white" borderTopRadius="20px">
                <Box>
                  <VStack
                    alignItems="flex-start"
                    p="10px"
                    w="full"
                    bg="gray.200"
                    borderRadius="5px"
                  >
                    <Box {...SubText}>{detail?.name}</Box>
                    <Flex justify="space-between" w="full" mt="4px">
                      <Flex h="25px" alignSelf="center">
                        <Box
                          position="relative"
                          bg="white"
                          border="1px solid #EAECF0"
                          borderRadius="5px 0px 0px 5px"
                          p={0}
                          w="25px"
                          h="25px"
                          _after={{
                            content: '""',
                            display: 'block',
                            height: '1px',
                            width: '9px',
                            backgroundColor: '#4A4D55',
                            position: 'absolute',
                            top: '11px',
                            left: '7px',
                          }}
                          _hover={{ cursor: 'pointer' }}
                          onClick={decQuantity}
                        ></Box>
                        <Flex
                          w="23px"
                          h="full"
                          borderTop="1px solid #EAECF0"
                          borderBottom="1px solid #EAECF0"
                        >
                          <Input
                            w="full"
                            h="full"
                            border="none"
                            fontSize="12px"
                            textAlign="center"
                            color="gray.800"
                            p={0}
                            bg="white"
                            value={quantity}
                            readOnly
                          ></Input>
                        </Flex>
                        <Box
                          position="relative"
                          bg="white"
                          border="1px solid #EAECF0"
                          borderRadius="0px 5px 5px 0px"
                          w="25px"
                          h="25px"
                          p={0}
                          _before={{
                            content: '""',
                            display: 'block',
                            width: '1px',
                            height: '9px',
                            backgroundColor: '#4A4D55',
                            position: 'absolute',
                            top: '7px',
                            left: '11px',
                          }}
                          _after={{
                            content: '""',
                            display: 'block',
                            height: '1px',
                            width: '9px',
                            backgroundColor: '#4A4D55',
                            position: 'absolute',
                            top: '11px',
                            left: '7px',
                          }}
                          onClick={incQuantity}
                          _hover={{ cursor: 'pointer' }}
                        ></Box>
                      </Flex>
                      <Flex {...TitleText} color="gray.600" alignItems="center">
                        {priceToString(detail?.price)}원
                      </Flex>
                    </Flex>
                  </VStack>
                  <Flex justify="space-between" w="full" pt="15px">
                    <Box {...SubText}>
                      총 수량
                      <span style={{ color: '#FF710B' }}> {quantity}</span> 개
                    </Box>
                    <Box {...SubText}>
                      합계
                      <span style={{ fontWeight: '700' }}>
                        {' '}
                        {priceToString(quantity * detail.price)}
                      </span>
                      원
                    </Box>
                  </Flex>
                  <Flex justify="space-between" w="100%" pt="15px" pb="10px">
                    <Button
                      colorScheme="primary"
                      w="calc(50% - 6.5px)"
                      h="50px"
                      borderRadius="25px"
                      size="sd"
                      py="12px"
                      onClick={SendQuery}
                    >
                      바로구매
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="primary"
                      w="calc(50% - 6.5px)"
                      h="50px"
                      borderRadius="25px"
                      size="sd"
                      py="12px"
                      onClick={postCart}
                    >
                      장바구니
                    </Button>
                  </Flex>
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
      <CartModal isOpen={isModalOpen} onClose={ModalClose} />
    </Box>
  );
}

export default Detail;

const ReviewButtonStyle = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

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

const ReviewrStyle = {
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '18px',
};

const ReviewDateStyle = {
  fontSize: '12px',
  lineHeight: '18px',
  color: 'gray.600',
  fontWeight: '400',
};

const ReviewContentStyle = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const ReviewCountStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};

const ChartStyle = {
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
};
