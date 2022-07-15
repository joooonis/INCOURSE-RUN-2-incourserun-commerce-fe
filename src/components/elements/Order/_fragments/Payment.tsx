import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

import { PayMentModal } from '@components/elements/Modal';
import { findProduct, priceToString } from '@components/hooks';

import SinglePayment from './SinglePayment';
import {
  FormValues,
  OrdererType,
  PaymentDataType,
  PaymentProductType,
  ProductType,
} from './types';
import usePostcode from './usePostCode';

function Payment() {
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>();

  const router = useRouter();
  const { product, quantity } = router.query;

  const [order, setOrder] = useState<ProductType>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>();
  const [deliveryFee, setDeliveryFee] = useState<number>();

  useEffect(() => {
    const order = findProduct(products, Number(product));
    setOrder(order);
    setTotal(order?.price * Number(quantity));

    if (order?.price * Number(quantity) >= 30000) setDeliveryFee(0);
    else setDeliveryFee(3000);
  }, [products]);

  const [orderer, setOrderer] = useState<OrdererType>();

  useEffect(() => {
    instance.get('/v1/products').then((res) => setProducts(res.data));
    instance.get('/v1/users/5').then((res) => {
      setOrderer({
        ...orderer,
        name: res.data.name,
        phone: res.data.phone,
        address: res.data.address,
        addressDetail: res.data.addressDetail,
      });
    });
  }, []);

  const { handleClick, fullAddress, zonecode } = usePostcode();
  const {
    handleClick: shippingHandleClick,
    fullAddress: shippingFullAddress,
    zonecode: shippingZonecode,
  } = usePostcode();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setOrderer({
      ...orderer,
      [name]: value,
    });
  };

  const matchShippingOrderer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (orderer?.name) setValue('shippingName', orderer?.name);
      if (orderer?.phone) setValue('shippingPhone', orderer?.phone);
      if (orderer?.address) setValue('shippingAddress', orderer?.address);
      else if (fullAddress) setValue('shippingAddress', fullAddress);

      if (orderer?.addressDetail)
        setValue('shippingAddressDetail', orderer?.addressDetail);
      if (zonecode) setValue('shippingZipcode', zonecode);
    } else reset();
  };

  const [isPaymentButtonActive, setIsPaymentButtonActive] = useState(false);
  const [isCard, setIsCard] = useState(false);

  const checkPayMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCard(e.target.checked);
  };

  const agreementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPaymentButtonActive(e.target.checked);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const shippingData = { ...data };
    if (total && deliveryFee) {
      shippingData.totalPrice = total;
      shippingData.deliveryFee = deliveryFee;
      shippingData.totalPaid = total + deliveryFee;
    }
    if (isCard) data.payMethod = '신용카드';

    if (shippingFullAddress) data.shippingAddress = shippingFullAddress;
    if (shippingZonecode) data.shippingZipcode = shippingZonecode;

    if (order) {
      const SingleOrderProduct: PaymentProductType = {
        product: Number(product),
        quantity: Number(quantity),
        price: order.price,
      };
      shippingData.orderProducts = [SingleOrderProduct];
    }
    shippingData.user = 5;

    console.log(shippingData);

    // const res = await instance.post('/v1/orders', data);
    // onClickPayment(res.data);
  };

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    document.body.appendChild(script1);

    const script2 = document.createElement('script');

    script2.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script2);

    () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const onClickPayment = (PaymentData: PaymentDataType) => {
    /* 1. 가맹점 식별하기 */

    const { IMP } = window;
    IMP.init('imp39787589');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: PaymentData.merchantUid, // 주문번호
      amount: 100, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: PaymentData.shippingName, // 구매자 이름
      buyer_tel: PaymentData.shippingPhone, // 구매자 전화번호
      buyer_email: 'example@example', // 구매자 이메일
      buyer_addr: PaymentData.shippingAddress, // 구매자 주소
      buyer_postcode: PaymentData.shippingZipcode, // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  const callback = (response: any) => {
    const { success, merchant_uid, imp_uid, error_msg } = response;
    if (success) {
      const data = {
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
      };
      instance.post('/v1/orders/payment/complete', data).then((res) => {
        if (res.data.status === 'paid') {
          onOpen();
          setTimeout(
            () => router.push(`/order/payment/complete/${res.data.order.id}`),
            3000,
          );
        }
      });
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  const test = () => {
    instance
      .post('/v1/orders/Payment/complete', {
        imp_uid: 'imp_328484503989',
        merchant_uid: 'ORD220711-000049',
      })
      .then((res) => {
        if (res.data.status === 'paid')
          router.push(`/order/Payment/complete/${res.data.order.id}`);
      });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PayMentModal isOpen={isOpen} onClose={onClose} />
      <VStack
        spacing={0}
        alignItems="flex-start"
        pt="130px"
        pb="80px"
        px="16px"
      >
        <Button display="none" onClick={test}>
          테스트
        </Button>
        <Box {...TitleText} w="full">
          주문결제
        </Box>
        <Box w="full">
          <Box {...SubTitleText} w="full" pt="80px" pb="11px">
            주문상품
          </Box>
          {order && quantity && (
            <SinglePayment
              product={order}
              quantity={Number(quantity)}
            ></SinglePayment>
          )}
        </Box>
        <Box w="full">
          <Box {...SubTitleText} pt="45px" pb="40px" w="full">
            주문자 정보
          </Box>
          <VStack spacing="50px" w="full" pb="50px" alignItems="flex-start">
            <Box w="full">
              <Text {...NameStyle}>이름</Text>
              <Input
                name="name"
                {...InputStyle}
                placeholder="김인코스런"
                value={orderer?.name}
                onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>핸드폰 번호</Text>
              <Input
                {...InputStyle}
                name="phone"
                placeholder="010-1234-1234"
                value={orderer?.phone}
                onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>주소</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
                  name="address"
                  placeholder="울특별시 마포구 성산동  123-3"
                  value={fullAddress ? fullAddress : orderer?.address}
                  onChange={onChange}
                />
                <Button
                  colorScheme="primary"
                  w="84px"
                  h="40px"
                  borderRadius="5px"
                  py="11px"
                  onClick={handleClick}
                >
                  우편번호 검색
                </Button>
              </Flex>
              <Input
                {...InputStyle}
                w="full"
                mt="10px"
                name="addressDetail"
                placeholder="성산빌딩 B동 302호"
                value={orderer?.addressDetail}
                onChange={onChange}
              />
            </Box>
          </VStack>
        </Box>
        <Box w="full" h="1px" bg="gray.200"></Box>
        <Box w="full">
          <Flex
            w="full"
            pt="50px"
            pb="40px"
            justify="space-between"
            alignItems="center"
          >
            <Box {...SubTitleText}>배송지 정보</Box>
            <HStack spacing="10px" alignItems="center">
              <Checkbox
                size="lg"
                colorScheme="primary"
                onChange={matchShippingOrderer}
              />
              <Box color="gray.600">주문자 정보와 동일</Box>
            </HStack>
          </Flex>

          <VStack spacing="50px" w="full" alignItems="flex-start">
            <Box w="full">
              <Text {...NameStyle}>이름</Text>
              <Input
                {...InputStyle}
                placeholder="김인코스런"
                {...register('shippingName', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>핸드폰 번호</Text>
              <Input
                {...InputStyle}
                placeholder="010-1234-1234"
                {...register('shippingPhone', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>주소</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
                  placeholder="울특별시 마포구 성산동  123-3"
                  value={shippingFullAddress}
                  {...register('shippingAddress', { required: true })}
                />
                <Button
                  colorScheme="primary"
                  w="84px"
                  h="40px"
                  borderRadius="5px"
                  py="11px"
                  onClick={shippingHandleClick}
                >
                  우편번호 검색
                </Button>
              </Flex>
              <Input
                {...InputStyle}
                w="full"
                mt="10px"
                placeholder="성산빌딩 B동 302호"
                {...register('shippingAddressDetail', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>배송요청사항</Text>
              <Input
                {...InputStyle}
                placeholder="문 앞에 두고 가주세요"
                {...register('shippingRequest')}
              />
            </Box>
          </VStack>
        </Box>
        <Box w="full" h="1px" bg="gray.200"></Box>
        <Box w="full">
          <Box {...SubTitleText} w="full" pt="40px" pb="10px">
            결제수단
          </Box>
          <HStack spacing="16px" w="full" h="90px" alignItems="center">
            <Checkbox
              size="lg"
              colorScheme="primary"
              onChange={checkPayMethod}
            />
            <Image src="/icons/svg/order/pay.svg" />
            <Box>신용카드결제</Box>
          </HStack>
        </Box>
        <Box w="full">
          <Box {...SubTitleText} w="full" pt="30px" pb="40px">
            최종 결제 금액
          </Box>
          <VStack {...PaymentText} spacing="10px" w="full" pb="20px">
            <Flex w="full" color="gray.600" justify="space-between">
              <Box>총 상품금액</Box>
              <Box>{total && priceToString(total)} 원</Box>
            </Flex>
            <Flex w="full" color="gray.600" justify="space-between">
              <Box>총 배송비</Box>
              <Box>{deliveryFee && priceToString(deliveryFee)} 원 </Box>
            </Flex>
          </VStack>
          <Box w="full" h="1px" bg="gray.200"></Box>
          <Flex py="20px" justify="space-between">
            <Box>결제금액</Box>
            <Box fontWeight={700} color="primary.500">
              {total && deliveryFee && priceToString(total + deliveryFee)} 원
            </Box>
          </Flex>
          <Box w="full" h="1px" bg="gray.200"></Box>
          <HStack spacing="10px" w="full" py="20px" alignItems="center">
            <Checkbox
              size="lg"
              colorScheme="primary"
              onChange={agreementHandler}
            />
            <Box color="gray.600">개인정보 수집 이용 동의(필수)</Box>
          </HStack>
        </Box>

        <Flex justify="space-between" w="100%" pt="40px">
          <Button
            {...ButtonText}
            borderRadius="25px"
            colorScheme="primary"
            w="full"
            h="50px"
            py="12px"
            type="submit"
            disabled={!isPaymentButtonActive}
          >
            결제하기
          </Button>
        </Flex>
      </VStack>
    </form>
  );
}

export default Payment;

const TitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
};

const SubTitleText = {
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '28px',
};

const InputStyle = {
  variant: 'outline',
  size: 'xs',
  px: '19px',
  py: '5px',
  h: '40px',
  fontSize: '16px',
  outline: '1px solid #1A1A1A',
  borderRadius: '100px',
  lineHeight: '28px',
  _focus: { border: '2px solid #FF710B', outline: 'none' },
  _placeholder: { color: 'gray.400' },
};

const PaymentText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};

const NameStyle = {
  fontSize: '12px',
  color: 'primary.500',
  fontWeight: 700,
  lineheight: '18px',
  pb: '10px',
};

const ButtonText = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
