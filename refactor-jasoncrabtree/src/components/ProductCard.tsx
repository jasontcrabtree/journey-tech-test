import { CgEuro } from "react-icons/cg";
import { useContext } from "react";
import { CurrencyContext } from "@/pages/_app";
import { ProductCardTypes } from "@/types/types"
import { calculateExchangeRate } from "@/utils/currency";

import styles from '@/styles/ProductCard.module.css'

export const renderCurrency = (currency: string): JSX.Element | undefined => {
    if (currency === "EURO") {
        return (<>€</>)
    } else if (currency === "USD") {
        return (<>$</>)
    } else if (currency === "NZD") {
        return (<>$</>)
    }
    null
}

const ProductCard = ({
    name,
    price,
    type
}: ProductCardTypes): JSX.Element => {
    const { currencyCtx } = useContext(CurrencyContext);

    return (
        <li className={styles.productCard}>
            <span className={styles.type}>
                {type}
            </span>
            <p className={styles.name}>
                {name}
            </p>
            <p className={styles.price}>
                {renderCurrency(currencyCtx)}
                {(price * calculateExchangeRate(currencyCtx)).toFixed(2)}{' '}{currencyCtx}
            </p>

        </li>
    )
}

export default ProductCard