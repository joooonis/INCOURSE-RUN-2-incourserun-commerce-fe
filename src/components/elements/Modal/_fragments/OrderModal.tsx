import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';

import PrimaryButton from '@components/common/Button';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface OrderModalProps extends MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantUid: string;
}

function OrderModal({ isOpen, onClose, merchantUid }: OrderModalProps) {
  const cancelOrder = () => {
    instance.post('/v1/orders/payment/cancel', {
      merchantUid: merchantUid,
      reason: '주문최소',
    });
    onClose();
  };
  return (
    <>
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
