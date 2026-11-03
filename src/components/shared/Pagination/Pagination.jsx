import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Keine Paginierung anzeigen wenn nur eine Seite vorhanden
  if (totalPages <= 1) return null

  // Array mit Seitenzahlen erstellen: [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.pagination}>

      {/* Zurück-Button */}
      <button
        className={`${styles.pagination__btn} ${styles['pagination__btn--arrow']}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Vorherige Seite"
      >
        <FiChevronLeft size={16} />
      </button>

      {/* Seitenzahlen */}
      {pages.map(page => (
        <button
          key={page}
          className={`${styles.pagination__btn} ${
            currentPage === page ? styles['pagination__btn--active'] : ''
          }`}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Weiter-Button */}
      <button
        className={`${styles.pagination__btn} ${styles['pagination__btn--arrow']}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Nächste Seite"
      >
        <FiChevronRight size={16} />
      </button>

    </div>
  )
}

export default Pagination
