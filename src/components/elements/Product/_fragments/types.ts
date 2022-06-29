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
