import styles from './FilterBar.module.css'

const FilterBar = ({ options, activeFilter, onFilter, label = 'Filter:' }) => {
  return (
    <div className={styles.filterbar}>
      <span className={styles.filterbar__label}>{label}</span>
      <div className={styles.filterbar__options}>
        {options.map(option => (
          <button
            key={option.value}
            className={`${styles.filterbar__btn} ${
              activeFilter === option.value ? styles['filterbar__btn--active'] : ''
            }`}
            onClick={() => onFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
