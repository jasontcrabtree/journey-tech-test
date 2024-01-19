import type { InferGetStaticPropsType } from 'next'
import FilterList from '@/components/FilterList'
import ProductList from '@/components/ProductList'
import styles from '@/styles/Home.module.css'
import { currencyRates } from '@/utils/currency'
import { getApiProducts } from '@/utils/data-loading'
import { ProductCategory, Product } from '@/types/types'
import { useContext, useState } from 'react'
import { CurrencyContext } from './_app'

export default function Home({ products }: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element {
  const [productCategory, setProductCategory] = useState('all');
  const { currencyCtx, updateCtx } = useContext(CurrencyContext);

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
    <main className={styles.main}>
      <div className={styles.headingBg}>
        <h1 className={styles.heading}>Journey Refactor</h1>
        <p>by Jason Crabtree</p>
      </div>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <FilterList title="Currencies" filterOptions={currencies} filterHandler={updateCtx} activeOption={currencyCtx} />
          <FilterList title="Products" filterOptions={productTypes} filterHandler={updateProductCategory} activeOption={productCategory} />
        </aside>
        <div className={styles.contentBorder}></div>
        {products && <ProductList products={products} filterByCategory={productCategory} />}
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  const { products } = await getApiProducts();

  return {
    props: {
      products: products.products,
      productByType: products.productsByType,
    },
    revalidate: 60,
  }
}