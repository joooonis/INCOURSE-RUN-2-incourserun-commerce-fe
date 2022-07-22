import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import { MyModalProps } from './types';

function PayMentModal({ isOpen, onClose }: MyModalProps) {
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
          <ModalBody pt={0} px="11px">
            <Box {...MessageStyle} textAlign="center" pt="31px" pb="40px">
              결제가 완료되었습니다.
            </Box>
            <Flex justify="center" pb="30px">
              <Image
                src="/icons/svg/order/payment_completed.svg"
                alt="payment_completed"
              ></Image>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PayMentModal;

const MessageStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
