import { useMemo } from 'react'
import { FiUsers } from 'react-icons/fi'
import MitarbeiterCard from '../MitarbeiterCard/MitarbeiterCard'
import Pagination from '../../shared/Pagination/Pagination'
import styles from './MitarbeiterList.module.css'

// Anzahl der Karten pro Seite
const ITEMS_PER_PAGE = 6

const MitarbeiterList = ({ employees, searchQuery, activeFilter, currentPage, onPageChange, onEdit }) => {

  // Gefilterte Liste — wird nur neu berechnet wenn sich Abhängigkeiten ändern
  const filteredEmployees = useMemo(() => {
    return employees
      .filter(emp => activeFilter === 'all' || emp.department === activeFilter)
      .filter(emp => {
        const query = searchQuery.toLowerCase().trim()
        return !query || emp.name.toLowerCase().includes(query) || emp.role.toLowerCase().includes(query)
      })
  }, [employees, searchQuery, activeFilter])

  // Aktuelle Seite aus der gefilterten Liste ausschneiden
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredEmployees, currentPage])

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)

  // Leerzustand — wenn keine Ergebnisse gefunden wurden
  if (filteredEmployees.length === 0) {
    return (
      <div className={styles.empty}>
        <FiUsers size={40} className={styles.empty__icon} />
        <p className={styles.empty__text}>Keine Mitarbeiter gefunden</p>
        <span className={styles.empty__hint}>Versuche einen anderen Suchbegriff oder Filter</span>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.count}>{filteredEmployees.length} Mitarbeiter gefunden</p>

      {/* Karten-Raster */}
      <div className={styles.grid}>
        {paginatedEmployees.map(employee => (
          <MitarbeiterCard key={employee.id} employee={employee} onEdit={onEdit} />
        ))}
      </div>

      {/* Paginierung */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default MitarbeiterList
