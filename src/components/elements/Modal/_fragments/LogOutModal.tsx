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

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LogOutModal({ isOpen, onClose }: MyModalProps) {
  const router = useRouter();

  const logOut = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      router.push('/');
    }
  };
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w="343px">
          <ModalCloseButton size="lg" color="gray.600" top="25px" />
          <ModalBody pt={0} px="11px" pb="33px">
            <Box {...MessageStyle} textAlign="center" pt="110px" pb="80px">
              로그아웃 하시겠습니까?
            </Box>
            <Flex justify="space-between">
              <PrimaryButton onClick={onClose} variant="outline" w="155px">
                취소
              </PrimaryButton>
              <PrimaryButton onClick={logOut} w="155px">
                확인
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogOutModal;

const MessageStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
};
