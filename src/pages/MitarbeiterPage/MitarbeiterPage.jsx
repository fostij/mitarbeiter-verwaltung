import { useState, useEffect } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { useAppContext } from '../../context/AppContext'
import MitarbeiterList from '../../components/mitarbeiter/MitarbeiterList/MitarbeiterList'
import MitarbeiterForm from '../../components/mitarbeiter/MitarbeiterForm/MitarbeiterForm'
import SearchBar from '../../components/shared/SearchBar/SearchBar'
import FilterBar from '../../components/shared/FilterBar/FilterBar'
import styles from './MitarbeiterPage.module.css'

// Filteroptionen für Abteilungen
const DEPARTMENT_FILTERS = [
  { value: 'all',        label: 'Alle'       },
  { value: 'IT',         label: 'IT'         },
  { value: 'Design',     label: 'Design'     },
  { value: 'Management', label: 'Management' },
  { value: 'HR',         label: 'HR'         },
  { value: 'Marketing',  label: 'Marketing'  },
  { value: 'Finanzen',   label: 'Finanzen'   },
]

const MitarbeiterPage = () => {
  const { employees } = useAppContext()

  const [searchQuery,     setSearchQuery    ] = useState('')
  const [activeFilter,    setActiveFilter   ] = useState('all')
  const [currentPage,     setCurrentPage    ] = useState(1)
  const [isFormOpen,      setIsFormOpen     ] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  // Seite zurücksetzen wenn Suche oder Filter sich ändern
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeFilter])

  const handleOpenAdd = () => {
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (employee) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingEmployee(null)
  }

  return (
    <div className={styles.page}>

      {/* Seitenheader */}
      <div className={styles.page__header}>
        <div className={styles.page__title}>
          <h1>Mitarbeiter</h1>
          <span className={styles.page__count}>{employees.length} gesamt</span>
        </div>
        <button className={styles.page__btn} onClick={handleOpenAdd}>
          <FiUserPlus size={16} />
          Neuer Mitarbeiter
        </button>
      </div>

      {/* Suche und Filter */}
      <div className={styles.page__toolbar}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Nach Name oder Rolle suchen..."
        />
        <FilterBar
          options={DEPARTMENT_FILTERS}
          activeFilter={activeFilter}
          onFilter={setActiveFilter}
          label="Abteilung:"
        />
      </div>

      {/* Mitarbeiterliste */}
      <MitarbeiterList
        employees={employees}
        searchQuery={searchQuery}
        activeFilter={activeFilter}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onEdit={handleOpenEdit}
      />

      {/* Formular-Modal — nur rendern wenn geöffnet */}
      {isFormOpen && (
        <MitarbeiterForm
          editingEmployee={editingEmployee}
          onClose={handleCloseForm}
        />
      )}

    </div>
  )
}

export default MitarbeiterPage
