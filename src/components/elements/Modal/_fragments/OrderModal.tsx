import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

import PrimaryButton from '@components/common/Button';

import { MyModalProps, OrderModalProps } from './types';

function OrderCanceledModal({ isOpen, onClose }: MyModalProps) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w="343px">
          <ModalBody pt={0} px="11px" pb="33px">
            <Box {...MessageStyle} textAlign="center" pt="110px" pb="80px">
              주문이 취소가 완료되었습니다.
            </Box>
            <Flex justify="center">
              <PrimaryButton onClick={onClose} w="155px">
                확인
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function OrderModal({ isOpen, onClose, merchantUid }: OrderModalProps) {
  const {
    isOpen: isOrderCanceledModalOpen,
    onOpen: onOrderCanceledModalOpen,
    onClose: onisOrderCanceledModalClose,
  } = useDisclosure();

  const cancelOrder = () => {
    instance
      .post('/v1/orders/payment/cancel', {
        merchantUid: merchantUid,
        reason: '주문최소',
      })
      .then((res) => {
        console.log(res.data);
        // api 수정되면 onClose(), onOrderCanceledModalOpen() 여기로 옮겨주세요
      });
    onClose();
    onOrderCanceledModalOpen();
  };
  return (
    <>
      <OrderCanceledModal
        isOpen={isOrderCanceledModalOpen}
        onClose={onisOrderCanceledModalClose}
      />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent w="343px">
          <ModalCloseButton size="lg" color="gray.600" top="25px" />
          <ModalBody pt={0} px="11px" pb="33px">
            <Box {...MessageStyle} textAlign="center" pt="110px" pb="80px">
              주문취소 하시겠습니까?
            </Box>
            <Flex justify="space-between">
              <PrimaryButton onClick={onClose} variant="outline" w="155px">
                취소
              </PrimaryButton>
              <PrimaryButton onClick={cancelOrder} w="155px">
                확인
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderModal;

const MessageStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
