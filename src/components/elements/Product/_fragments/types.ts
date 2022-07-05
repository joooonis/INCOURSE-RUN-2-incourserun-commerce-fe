export type ProductType = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  hashtags: Hashtag[];
  avgRating: number;
  reviewCount: number;
};

export interface DetailType {
  avgRating: number;
  name: string;
  id: number;
  capacity: number;
  price: number;
  description?: string;
  detailImg?: string;
  productImg?: string;
  reviewCount: number;
}

type Hashtag = {
  id: number;
  name: string;
};
interface Photo {
  id: number;
  img: string;
}

export type OrderingType = 'created_at' | 'rating' | '-rating';

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
