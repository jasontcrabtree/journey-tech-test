import FilterList from '@/components/FilterList'
import ProductList from '@/components/ProductList'
import styles from '@/styles/Home.module.css'
import { IndexPageTypes } from '@/types/types'
import type { InferGetStaticPropsType } from 'next'


export default function Home({ currencies, productTypes, products }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <h1>Index page</h1>
      <FilterList filterOptions={currencies} />
      <FilterList filterOptions={productTypes} />
      <ProductList products={products} />
    </>
  )
}


export const getStaticProps = () => {
  const products = [
    {
      name: "Product 1",
      price: 10,
      currency: "NZD",
      type: 'T-Shirt'
    },
    {
      name: "Product 2",
      price: 30,
      currency: "NZD",
      type: 'Lawnmower'
    },
    {
      name: "Product 3",
      price: 5,
      currency: "NZD",
      type: 'Phonecase'
    },
  ]

  const productTypes = [
    'T-Shirt',
    'Lawnmower',
    'Phonecase'
  ]

  const currencies = ['NZD', 'USD', 'EURO'];

  return {
    props: {
      currencies,
      productTypes,
      products,
    },
    revalidate: 60,
  }
}