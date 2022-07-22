import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Container, Flex, Spinner, useDisclosure } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import { setAuthHeader } from '@apis/_axios/instance';

import { PayMentModal } from '@components/elements/Modal';

import { getToken } from '@utils/localStorage/token';

function CompleteMobile() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);

  const { merchant_uid, imp_uid } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
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
  }, [imp_uid, merchant_uid]);

  return (
    <Container w="375px" h="812px">
      <Flex w="full" h="full" justify="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.500"
          size="xl"
        />
      </Flex>
      <PayMentModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}

export default CompleteMobile;
