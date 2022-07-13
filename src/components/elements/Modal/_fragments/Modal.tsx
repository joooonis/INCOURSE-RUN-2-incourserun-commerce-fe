import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import PrimaryButton from '@components/common/Button';

interface MyModalProps {
  children: string | JSX.Element;
  buttonText: string;
}

export default function MyModal({ children, buttonText }: MyModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Trigger modal</Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <PrimaryButton>{buttonText}</PrimaryButton>
          <Button onClick={onClose}>Close</Button>
        </ModalContent>
      </Modal>
    </>
  );
}
