export interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface OrderModalProps extends MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantUid: string;
  setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}

type OrderType = {
  id: number;
  user: number;
  createdAt: string;
  shippingName: string;
  shippingPhone: string;
  shippingZipcode: string;
  shippingAddress: string;
  shippingAddressDetail: string;
  shippingRequest: string;
  shippingStatus: string;
  payMethod: string;
  deliveryFee: number;
  totalPaid: number;
  orderProducts: orderProductType[];
  totalPrice: number;
  merchantUid: string;
  isCancelled: boolean;
};

interface orderProductType {
  id: number;
  product: number;
  quantity: number;
  hasReview: boolean;
  shippingStatus: string;
}
