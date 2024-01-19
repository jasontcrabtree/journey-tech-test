import {
  ProductGroups,
  ProductGroupLabel,
  Products,
  Lawnmower,
  Phonecase,
  TShirt,
  Product,
  ProductCategory,
} from '@/types/types';
import LawnmowerRepository from '../../compiled/LawnmowerRepository';
import PhoneCaseRepository from '../../compiled/PhoneCaseRepository';
import TShirtRepository from '../../compiled/TShirtRepository';

const addProductType = (
  productsArray: ProductGroups[],
  category: ProductGroupLabel,
  products: Products
) => {
  productsArray.forEach((product, index) => {
    products[category][String(index)] = {
      ...product,
      type: category,
    };
  });
};

export const getDBProducts = () => {
  const lawnmowers: Lawnmower[] = new LawnmowerRepository().getAll();
  const phones: Phonecase[] = new PhoneCaseRepository().getAll();
  const shirts: TShirt[] = new TShirtRepository().getAll();

  const productsByType: Products = {
    lawnmower: {},
    phonecase: {},
    tshirt: {},
  };

  addProductType(lawnmowers, 'lawnmower', productsByType);
  addProductType(phones, 'phonecase', productsByType);
  addProductType(shirts, 'tshirt', productsByType);

  const flattenedProducts: Product[] = (
    Object.values(productsByType) as ProductCategory[]
  ).flatMap(category => Object.values(category));

  return {
    productsByType,
    products: flattenedProducts,
  };
};

export const getApiProducts = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  return data;
};
