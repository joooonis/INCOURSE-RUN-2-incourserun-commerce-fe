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
  const { register, handleSubmit, setValue, reset, getValues } =
    useForm<FormValues>();

  const { checked } = router.query;

  const [orders, setOrders] = useState<ProductType[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  useEffect(() => {
    if (!router.isReady) return;

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
  }, [products, router.isReady]);

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

  const {
    handleClick: ordererHandleClick,
    fullAddress: ordererFullAddress,
    zonecode: ordererZonecode,
  } = usePostcode();
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

  useEffect(() => {
    if (shippingFullAddress) setValue('shippingAddress', shippingFullAddress);
  }, [shippingFullAddress]);

  const matchShippingOrderer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (orderer?.name) setValue('shippingName', orderer?.name);
      if (orderer?.phone) setValue('shippingPhone', orderer?.phone);
      if (orderer?.address) setValue('shippingAddress', orderer?.address);
      else if (ordererFullAddress)
        setValue('shippingAddress', ordererFullAddress);

      if (orderer?.addressDetail)
        setValue('shippingAddressDetail', orderer?.addressDetail);
      if (ordererZonecode) setValue('shippingZipcode', ordererZonecode);
    } else reset();
  };
  const [isPaymentButtonActive, setIsPaymentButtonActive] =
    useState<boolean>(false);
  const [isAgreement, setIsAgreement] = useState<boolean>(false);
  const [isCard, setIsCard] = useState<boolean>(false);

  const checkPayMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCard(e.target.checked);
    setIsPaymentButtonActive(e.target.checked && isAgreement);
  };

  const agreementHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreement(e.target.checked);
    setIsPaymentButtonActive(isCard && e.target.checked);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const shippingData = { ...data };
    if ((total && deliveryFee) || (total && deliveryFee == 0)) {
      shippingData.totalPrice = total;
      shippingData.deliveryFee = deliveryFee;
      shippingData.totalPaid = total + deliveryFee;
    }
    if (isCard) shippingData.payMethod = '????????????';

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

    return () => {
      document.body.removeChild(jQuery);
      document.body.removeChild(payModule);
    };
  }, []);

  function onClickPayment(payData: PaymentDataType) {
    /* 1. ????????? ???????????? */
    const { IMP } = window;
    IMP.init('imp61247005');

    /* 2. ?????? ????????? ???????????? */
    const data = {
      pg: 'html5_inicis', // PG???
      pay_method: 'card', // ????????????
      merchant_uid: payData.merchantUid, // ????????????
      amount: payData.totalPaid, // ????????????
      name: '???????????? ?????? ????????? ??????', // ?????????
      buyer_name: payData.shippingName, // ????????? ??????
      buyer_tel: payData.shippingPhone, // ????????? ????????????
      buyer_addr: payData.shippingAddress, // ????????? ??????
      buyer_postcode: payData.shippingZipcode, // ????????? ????????????
      m_redirect_url: `${process.env.NEXT_PUBLIC_DOMAIN}/order/payment/complete/mobile`,
    };

    /* 4. ?????? ??? ???????????? */
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
        if (res.data.status === 'paid')
          router.push(`/order/payment/complete/${res.data.order.id}`);
      });
    } else {
      alert(`?????? ??????: ${error_msg}`);
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
          ?????????
        </Button>
        <Box {...TitleText} w="full">
          ????????????
        </Box>
        <Box w="full">
          <Box {...SubTitleText} w="full" pt="80px" pb="11px">
            ????????????
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
            ????????? ??????
          </Box>
          <VStack spacing="50px" w="full" pb="50px" alignItems="flex-start">
            <Box w="full">
              <Text {...NameStyle}>??????</Text>
              <Input
                name="name"
                {...InputStyle}
                value={orderer?.name}
                onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>????????? ??????</Text>
              <Input
                {...InputStyle}
                name="phone"
                value={orderer?.phone}
                onChange={onChange}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>??????</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
                  name="address"
                  onClick={ordererHandleClick}
                  value={ordererFullAddress ? ordererFullAddress : ''}
                />
                <Button
                  colorScheme="primary"
                  w="84px"
                  h="40px"
                  borderRadius="5px"
                  py="11px"
                  onClick={ordererHandleClick}
                >
                  ???????????? ??????
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
            <Box {...SubTitleText}>????????? ??????</Box>
            <HStack spacing="10px" alignItems="center">
              <Checkbox
                size="lg"
                colorScheme="primary"
                onChange={matchShippingOrderer}
              />
              <Box color="gray.600">????????? ????????? ??????</Box>
            </HStack>
          </Flex>

          <VStack spacing="50px" w="full" alignItems="flex-start">
            <Box w="full">
              <Text {...NameStyle}>??????</Text>
              <Input
                {...InputStyle}
                {...register('shippingName', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>????????? ??????</Text>
              <Input
                {...InputStyle}
                {...register('shippingPhone', { required: true })}
              />
            </Box>
            <Box w="full">
              <Text {...NameStyle}>??????</Text>
              <Flex justify="space-between">
                <Input
                  {...InputStyle}
                  w="249px"
                  onClick={shippingHandleClick}
                  value={
                    getValues('shippingAddress')
                      ? getValues('shippingAddress')
                      : ''
                  }
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
                  ???????????? ??????
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
              <Text {...NameStyle}>??????????????????</Text>
              <Input {...InputStyle} {...register('shippingRequest')} />
            </Box>
          </VStack>
        </Box>
        <Box w="full" h="1px" bg="gray.200"></Box>
        <Box w="full">
          <Box {...SubTitleText} w="full" pt="40px" pb="10px">
            ????????????
          </Box>
          <HStack spacing="16px" w="full" h="90px" alignItems="center">
            <Checkbox
              size="lg"
              colorScheme="primary"
              onChange={checkPayMethod}
            />
            <Image src="/icons/svg/order/pay.svg" />
            <Box>??????????????????</Box>
          </HStack>
        </Box>
        <Box w="full">
          <Box {...SubTitleText} w="full" pt="30px" pb="40px">
            ?????? ?????? ??????
          </Box>
          <VStack {...PayText} spacing="10px" w="full" pb="20px">
            <Flex w="full" color="gray.600" justify="space-between">
              <Box>??? ????????????</Box>
              <Box>{total && priceToString(total)} ???</Box>
            </Flex>
            <Flex w="full" color="gray.600" justify="space-between">
              <Box>??? ?????????</Box>
              <Box>{deliveryFee && priceToString(deliveryFee)} ??? </Box>
            </Flex>
          </VStack>
          <Box w="full" h="1px" bg="gray.200"></Box>
          <Flex py="20px" justify="space-between">
            <Box>????????????</Box>
            <Box fontWeight={700} color="primary.500">
              {(total && deliveryFee) || deliveryFee == 0
                ? priceToString(total + deliveryFee)
                : '0'}
              ???
            </Box>
          </Flex>
          <Box w="full" h="1px" bg="gray.200"></Box>
          <HStack spacing="10px" w="full" py="20px" alignItems="center">
            <Checkbox
              size="lg"
              colorScheme="primary"
              onChange={agreementHandler}
            />
            <Box color="gray.600">???????????? ?????? ?????? ??????(??????)</Box>
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
            ????????????
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
