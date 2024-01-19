const FilterList = ({ title, filterOptions, filterHandler }: {
    title: string,
    filterOptions: string[],
    filterHandler: (arg0: string) => void
}): JSX.Element | null => {
    if (!filterOptions) {
        return null
    }

    return (
        <>
            {title && <span>{title}</span>}
            <ul role="filter">
                {filterOptions.map((option, index) => {
                    return (
                        <li key={index}>
                            {/* <button onClick={(() => filterHandler([option]))}> */}
                            <button onClick={() => filterHandler(option)}>
                                {option}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default FilterList