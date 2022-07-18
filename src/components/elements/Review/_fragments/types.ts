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

interface OrderProductType {
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
  orderProducts: OrderProductType[];
  totalAmount: number;
};

export interface SingleOrderProps {
  product: ProductType;
  quantity: number;
  shippingStatus: string;
  hasReview: boolean;
  isFreeOrder: boolean;
}

interface Photo {
  id: number;
  img: string;
}

export type ReviewType = {
  id: number;
  content: string;
  createdAt: string;
  rating: number;
  photos: Photo[];
};

export interface SingleReviewProps {
  review: ReviewType;
}

export interface StarRatingProps {
  starRating: number;
  upStar?: any;
  downStar?: any;
}

export type ReviewFormValues = {
  user: number;
  orderProduct: number;
  rating: number;
  content: string;
  photos: FileList;
};

export interface PreviewsType {
  preview1?: string;
  preview2?: string;
  preview3?: string;
}