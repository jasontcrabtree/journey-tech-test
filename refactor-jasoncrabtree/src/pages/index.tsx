import type { InferGetStaticPropsType } from 'next'
import FilterList from '@/components/FilterList'
import ProductList from '@/components/ProductList'
import styles from '@/styles/Home.module.css'
import { currencyRates } from '@/utils/currency'
import { getApiProducts } from '@/utils/data-loading'
import { ProductCategory, Product } from '@/types/types'
import { useContext, useState } from 'react'
import { CurrencyContext } from './_app'

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const [productCategory, setProductCategory] = useState('all');
  const { updateCtx } = useContext(CurrencyContext);

  const updateProductCategory = (category: string) => {
    setProductCategory(category);
  }

  const currencies = currencyRates.map((currency) => currency.currency)
  const productTypes = Array.from<string>(
    new Set(products.map(
      (product: Product) => product.type
    ))
  );
  productTypes.unshift('all');

  return (
    <main>
      <h1>Index page</h1>
      {/* <h2>
        {currency}
      </h2> */}
      <h2>
        {productCategory}
      </h2>
      <div className="flex flex-row gap-32">
        <aside className="flex gap-24">
          <FilterList title="Currencies" filterOptions={currencies} filterHandler={updateCtx} />
          <FilterList title="Products" filterOptions={productTypes} filterHandler={updateProductCategory} />
        </aside>
        <ProductList products={products} filterByCategory={productCategory} />
      </div>
    </main>
  )
}

export const getStaticProps = async () => {
  const { products } = await getApiProducts();

  return {
    props: {
      products: products.products,
      productByType: products.productsByType,
    },
    revalidate: 60,
  }
}