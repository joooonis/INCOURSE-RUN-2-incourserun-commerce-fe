export type ProductType = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  hashtags?: Hashtag[];
  avgRating?: number;
  reviewCount?: number;
};

type Hashtag = {
  id: number;
  name: string;
};

export interface orderProductType {
  id: number;
  product: number;
  quantity: number;
  hasReview: boolean;
  shippingStatus: string;
}

export type OrderType = {
  id: number;
  user: number;
  createdAt: string;
  shippingName: string;
  shippingPhone: string;
  shippingZipcode: string;
  shippingAddress: string;
  shippingAddressDetail: string;
  shippingRequest: string;
  payMethod: string;
  deliveryFee: number;
  totalPaid: number;
  orderProducts: orderProductType[];
  totalPrice: number;
  merchantUid: string;
};

export interface SingleOrderProps {
  id: number;
  product: ProductType;
  quantity: number;
  shippingStatus?: string;
  hasReview?: boolean;
  isFreeDelivery?: boolean;
  createdAt?: string;
  merchantUid: string;
}

export interface SinglePaymentProps {
  product: ProductType;
  quantity: number;
  isPaymentCompleted?: boolean;
}
export interface FormValues {
  user: number;
  shippingName: string;
  shippingPhone: string;
  shippingZipcode: string;
  shippingAddress: string;
  shippingAddressDetail: string;
  shippingRequest: string;
  payMethod: string;
  totalPrice: number;
  deliveryFee: number;
  totalPaid: number;
  orderProducts: PaymentProductType[];
}

export interface PaymentDataType {
  user: number;
  shippingName: string;
  shippingPhone: string;
  merchantUid: string;
  shippingZipcode: string;
  shippingAddress: string;
  shippingAddressDetail: string;
  shippingRequest: string;
  payMethod: string;
  totalPrice: number;
  deliveryFee: number;
  totalPaid: number;
  orderProducts: PaymentProductType[];
}

export type PaymentProductType = {
  product: number;
  quantity: number;
  price: number;
};

export type OrdererType = {
  name?: string;
  phone?: string;
  address?: string;
  addressDetail?: string;
  zoncode?: string;
};
