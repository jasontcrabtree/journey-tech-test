export interface ProductCardTypes {
  name: string;
  price: number;
  type: string;
}

export type IndexPageTypes = {
  currencies: string[];
  productTypes: string[];
  products: ProductCardTypes[];
};

export interface Product extends ProductCardTypes {
  id: number;
  [key: string]: any; // unknown ahead of time additional properties (product specific)
}

export type ProductCategory = {
  [key: string]: Product;
};

export type Lawnmower = {
  id: number;
  name: string;
  fuelEfficiency: string;
  isVehicle: boolean;
  price: number;
  type?: string;
};

export type Phonecase = {
  id: number;
  name: string;
  price: number;
  type?: string;
};

export type TShirt = {
  id: number;
  name: string;
  price: number;
  type?: string;
};

export type ProductGroups = Lawnmower | Phonecase | TShirt;

export type ProductGroupLabel = 'lawnmower' | 'phonecase' | 'tshirt';

export type Products = {
  lawnmower: { [key: string]: Lawnmower };
  phonecase: { [key: string]: Phonecase };
  tshirt: { [key: string]: TShirt };
};
