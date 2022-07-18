export default function findProduct(
  products: ProductType[],
  id: number,
): ProductType {
  const targetIndex = products.findIndex((e) => e.id === id);
  // targetIndex === -1 인 케이스 예외처리
  return products[targetIndex];
}

type ProductType = {
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
