import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import PrimaryButton from '@components/common/Button';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartModal({ isOpen, onClose }: MyModalProps) {
  const router = useRouter();
  const gotoCart = () => {
    router.push('/cart');
  };
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w="343px">
          <ModalCloseButton size="lg" color="gray.600" top="25px" />
          <ModalBody pt={0} px="11px" pb="33px">
            <Box {...MessageStyle} textAlign="center" pt="110px" pb="80px">
              장바구니에 상품이 담겼습니다.
            </Box>
            <Flex justify="space-between">
              <PrimaryButton onClick={gotoCart} variant="outline" w="155px">
                장바구니 이동
              </PrimaryButton>
              <PrimaryButton onClick={onClose} w="155px">
                쇼핑 계속하기
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CartModal;

const MessageStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
