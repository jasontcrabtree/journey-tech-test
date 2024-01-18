const FilterList = ({ filterOptions }: { filterOptions: string[] }): JSX.Element | null => {
    if (!filterOptions) {
        return null
    }

    return (
        <ul role="filter">
            {filterOptions.map((option, index) => {
                return (
                    <li key={index}>
                        <button>
                            {option}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default FilterList