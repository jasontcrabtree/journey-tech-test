import { ProductCardTypes } from "@/types/types";
import ProductCard from "./ProductCard";

type ProductListTypes = {
    products: ProductCardTypes[];
}

const ProductList = ({ products }: ProductListTypes): JSX.Element | null => {
    if (!products) {
        return null
    }

    return (
        <ul>
            {products.map((product: ProductCardTypes, index) => (
                <ProductCard
                    key={index}
                    name={product.name}
                    price={product.price}
                    currency={product.currency}
                    type={product.type}
                />
            ))}
        </ul>
    )
}

export default ProductList