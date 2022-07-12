export type ProductType = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  hashtags?: Hashtag[];
  avgRating?: number;
  reviewCount?: number;
};

export type ItemType = {
  id: number;
  user: number;
  product: number;
  quantity: number;
};

export type ItemChecker = {
  id: number;
  checked: boolean;
  price: number;
  quantity: number;
};

type Hashtag = {
  id: number;
  name: string;
};
export interface ItemPropsType {
  product: ProductType;
  item: ItemChecker;
  incTotal: Function;
  decTotal: Function;
  // deleteItem: Function;
  checkItem: Function;
}
