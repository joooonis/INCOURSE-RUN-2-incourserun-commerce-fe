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
  id: number;
  product: ProductType;
  quantity: number;
}

export interface FormValues {
  avatar: File;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  agreeAllTerms: boolean;
  requiredTerms: boolean;
  privateInfoTerms: boolean;
  marketingTerms: boolean;
}

export type User = {
  avatar: File;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
};
