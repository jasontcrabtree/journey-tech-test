import { CurrencyContext } from "@/pages/_app";
import { ProductCardTypes } from "@/types/types"
import { calculateExchangeRate } from "@/utils/currency";
import { useContext } from "react";

const ProductCard = ({
    name,
    price,
    type
}: ProductCardTypes): JSX.Element => {
    const { currencyCtx } = useContext(CurrencyContext);

    return (
        <li>
            <p>
                {name}
            </p>
            <p>
                <span>
                    <CgEuro />
                    {currencyCtx}
                </span>
                <span>
                    {(price * calculateExchangeRate(currencyCtx)).toFixed(2)}
                </span>
            </p>
            <span>
                {type}
            </span>
        </li>
    )
}

export default ProductCard