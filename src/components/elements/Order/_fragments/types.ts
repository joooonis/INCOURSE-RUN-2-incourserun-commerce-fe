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

interface orderProductType {
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
  orderProducts: orderProductType[];
  totalPrice: number;
};

export interface SingleOrderProps {
  id: number;
  product: ProductType;
  quantity: number;
  shippingStatus?: string;
  hasReview?: boolean;
  isFreeDelivery?: boolean;
  createdAt?: string;
}

export interface SinglePayProps {
  product: ProductType;
  quantity: number;
}
export interface FormValues {
  name: string;
  phone: string;
  address: string;
  addressDetail: string;
  shippingRequest: string;
  payMethod: string;
  totalPrice: number;
  deliveryFee: number;
  totalPaid: number;
  orderProducts: payProductType[];
}

type payProductType = {
  product: number;
  quantitu: number;
  price: number;
};

export type OrdererType = {
  name?: string;
  phone?: string;
  address?: string;
  addressDetail?: string;
};
