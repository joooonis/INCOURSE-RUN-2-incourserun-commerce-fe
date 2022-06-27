import { useEffect, useState } from 'react';

import axios from 'axios';

import { SERVER_URL } from '@components/elements/urls';

type Hashtag = {
  id: number;
  name: string;
};

export type ProductType = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  hashtags?: Hashtag[];
  avgRating?: number;
  reviewCount?: number;
};

export function useProduct() {
  const [products, setProducts] = useState<ProductType[]>();
  const url = SERVER_URL.PRODUCT + '/v1/products';
  useEffect(() => {
    axios({
      method: 'GET',
      url: url,
    }).then((res) => {
      setProducts(res.data);
    });
  }, [url]);

  return { products };
}
