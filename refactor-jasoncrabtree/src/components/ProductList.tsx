import { ProductCardTypes } from "@/types/types";
import ProductCard from "./ProductCard";

import styles from '@/styles/ProductList.module.css'

type ProductListTypes = {
    products: ProductCardTypes[];
    filterByCategory: string;
}

const ProductList = ({ products, filterByCategory }: ProductListTypes): JSX.Element | null => {
    if (!products) {
        return null
    }

    return (
        <ul className={styles.productList}>
            {products.map((product: ProductCardTypes) => {
                if (filterByCategory === "all"
                    || filterByCategory === product.type) {
                    return (<ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        type={product.type}
                    />)
                }
            })}
        </ul>
    )
}

export default ProductList