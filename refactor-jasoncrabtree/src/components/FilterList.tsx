import clsx from 'clsx';
import styles from '@/styles/FilterList.module.css'

const FilterList = ({ title, filterOptions, activeOption, filterHandler }: {
    title: string,
    filterOptions: string[],
    activeOption: string,
    filterHandler: (arg0: string) => void
}): JSX.Element | null => {
    if (!filterOptions) {
        return null
    }

    return (
        <div className={styles.content}>
            {title && <span className={styles.title}>{title}</span>}
            <ul role="filter" className={styles.list}>
                {filterOptions.map((option, index) => {
                    return (
                        <li key={index}>
                            <button name={option} className={clsx(
                                activeOption === option
                                    ? `${styles.filterButton} ${styles.active}`
                                    : styles.filterButton
                            )}
                                onClick={() => {
                                    filterHandler(option)
                                }}>
                                {option}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FilterList