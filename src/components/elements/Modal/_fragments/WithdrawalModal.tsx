import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import PrimaryButton from '@components/common/Button';

import { MyModalProps } from './types';

function WithdrawalModal({ isOpen, onClose }: MyModalProps) {
  const router = useRouter();
  const Complete = () => {
    onClose();
    router.push('/login');
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
              탈퇴가 완료되었습니다.
            </Box>
            <Flex justify="center">
              <PrimaryButton onClick={Complete} w="155px">
                확인
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WithdrawalModal;

const MessageStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
