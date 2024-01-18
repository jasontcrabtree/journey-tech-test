export type ProductCardTypes = {
  name: string;
  price: number;
  currency: string;
  type: string;
};

export type IndexPageTypes = {
  currencies: string[];
  productTypes: string[];
  products: ProductCardTypes[];
};
