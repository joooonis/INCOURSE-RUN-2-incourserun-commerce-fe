import {
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

export default function CartModal({ isOpen, onClose }: MyModalProps) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>장바구니에 상품이 담겼습니다.</ModalBody>
          <Flex>
            <PrimaryButton onClick={onClose}>장바구니 이동</PrimaryButton>
            <PrimaryButton onClick={onClose}>쇼핑 계속하기</PrimaryButton>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}
