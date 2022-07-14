export interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface OrderModalProps extends MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantUid: string;
}
