export type ProductType = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  hashtags: Hashtag[];
  avgRating: number;
  reviewCount: number;
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
  totalAmount: number;
};

export interface SingleOrderProps {
  product: ProductType;
  quantity: number;
  shippingStatus: string;
  hasReview: boolean;
  isFreeOrder: boolean;
}
