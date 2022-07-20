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
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { findProduct, priceToString } from '@components/hooks';

import { getToken } from '@utils/localStorage/token';

import SinglePayment from './SinglePayment';
import {
  FormValues,
  OrdererType,
  PaymentDataType,
  PaymentProductType,
  ProductType,
  QueryType,
} from './types';
import usePostcode from './usePostCode';

function CartPayMent() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>();

  const { checked } = router.query;

  const [orders, setOrders] = useState<ProductType[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  useEffect(() => {
    if (typeof checked === 'string') {
      const queries = JSON.parse(checked);
      if (queries) {
        queries?.forEach((query: QueryType) => {
          const order = findProduct(products, Number(query.product));
          if (order) {
            setOrders((orders) => [...orders, order]);
            setQuantities((quantities) => [...quantities, query.quantity]);
          }
        });
      }
    }
  }, [products]);

  useEffect(() => {
    if (orders && quantities) {
      let sum = 0;
      for (let i = 0; i < orders.length; i++) {
        sum += +orders[i].price * quantities[i];
      }
      setTotal(sum);
      if (sum < 30000) setDeliveryFee(3000);
      else setDeliveryFee(0);
    }
  }, [orders, quantities]);

  const [orderer, setOrderer] = useState<OrdererType>();

  useEffect(() => {
    instance.get('/v1/products').then((res) => setProducts(res.data));
    instance.get('/v1/users/me').then((res) => {
      setOrderer({ ...res.data });
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

  const [isPayButtonActive, setIsPayButtonActive] = useState(false);
  const [isCard, setIsCard] = useState(false);

  const checkPayMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCard(e.target.checked);
  };

  const agreementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPayButtonActive(e.target.checked && isCard);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const shippingData = { ...data };
    if ((total && deliveryFee) || (total && deliveryFee == 0)) {
      shippingData.totalPrice = total;
      shippingData.deliveryFee = deliveryFee;
      shippingData.totalPaid = total + deliveryFee;
    }
    if (isCard) shippingData.payMethod = '신용카드';

    if (shippingFullAddress) shippingData.shippingAddress = shippingFullAddress;
    if (shippingZonecode) shippingData.shippingZipcode = shippingZonecode;

    if (orders && quantities) {
      const orderProducts = [];
      for (let i = 0; i < orders.length; i++) {
        const SingleOrderProduct: PaymentProductType = {
          product: orders[i].id,
          quantity: quantities[i],
          price: orders[i].price,
        };
        orderProducts.push(SingleOrderProduct);
      }
      shippingData.orderProducts = orderProducts;
    }

    instance.post('/v1/orders', shippingData).then((res) => {
      onClickPayment(res.data);
    });
  };

  useEffect(() => {
    const jQuery = document.createElement('script');
    jQuery.type = 'text/javascript';
    jQuery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    document.body.appendChild(jQuery);

    const payModule = document.createElement('script');
    payModule.type = 'text/javascript';
    payModule.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    document.body.appendChild(payModule);

    const postCode = document.createElement('script');

    postCode.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(postCode);

    () => {
      document.body.removeChild(jQuery);
      document.body.removeChild(payModule);
      document.body.removeChild(postCode);
    };
  }, []);

  function onClickPayment(payData: PaymentDataType) {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp61247005');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: payData.merchantUid, // 주문번호
      amount: payData.totalPaid, // 결제금액
      name: '아임포트 결제 데이터 분석', // 주문명
      buyer_name: payData.shippingName, // 구매자 이름
      buyer_tel: payData.shippingPhone, // 구매자 전화번호
      buyer_addr: payData.shippingAddress, // 구매자 주소
      buyer_postcode: payData.shippingZipcode, // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  function callback(response: any) {
    const { success, merchant_uid, imp_uid, error_msg } = response;
    if (success) {
      const data = {
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
      };
      instance.post('/v1/orders/payment/complete', data).then((res) => {
        if (res.data.status === 'paid') console.log(res.data);
        router.push(`/order/pay/complete/${res.data.order.id}`);
      });
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  const test = () => {
    instance
      .post('/v1/orders/payment/complete', {
        imp_uid: 'imp_328484503989',
        merchant_uid: 'ORD220711-000049',
      })
      .then((res) => {
        if (res.data.status === 'paid')
          router.push(`/order/pay/complete/${res.data.order.id}`);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {orders &&
            quantities &&
            orders.map((order, index) => {
              return (
                <SinglePayment
                  key={index}
                  product={order}
                  quantity={quantities[index]}
                ></SinglePayment>
              );
            })}
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
                value={orderer?.name}
                onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>핸드폰 번호</Text>
              <Input
                {...InputStyle}
                name="phone"
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
                {...register('shippingName', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>핸드폰 번호</Text>
              <Input
                {...InputStyle}
                {...register('shippingPhone', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>주소</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
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
                {...register('shippingAddressDetail', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>배송요청사항</Text>
              <Input {...InputStyle} {...register('shippingRequest')} />
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
          <VStack {...PayText} spacing="10px" w="full" pb="20px">
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
              {(total && deliveryFee) || deliveryFee == 0
                ? priceToString(total + deliveryFee)
                : '0'}
              원
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
            disabled={!isPayButtonActive}
          >
            결제하기
          </Button>
        </Flex>
      </VStack>
    </form>
  );
}

export default CartPayMent;

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

const PayText = {
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
