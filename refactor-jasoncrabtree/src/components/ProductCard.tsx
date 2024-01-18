import { ProductCardTypes } from "@/types/types"

const ProductCard = ({
    name,
    price,
    currency,
    type
}: ProductCardTypes): JSX.Element => {
    return (
        <li>
            <p>
                {name}
            </p>
            <p>
                <span>
                    {currency}
                </span>
                <span>
                    {price}
                </span>
            </p>
            <span>
                {type}
            </span>
        </li>
    )
}

export default ProductCard