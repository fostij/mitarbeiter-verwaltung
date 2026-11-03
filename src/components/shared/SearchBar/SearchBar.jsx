import { useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import styles from './SearchBar.module.css'

const SearchBar = ({ value, onChange, placeholder = 'Suchen...' }) => {
  // useRef — Fokus auf das Eingabefeld setzen nach dem Löschen
  const inputRef = useRef(null)

  const handleClear = () => {
    onChange('')
    inputRef.current.focus()
  }

  return (
    <div className={styles.searchbar}>
      <FiSearch className={styles.searchbar__icon} size={16} />
      <input
        ref={inputRef}
        className={styles.searchbar__input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {/* Löschen-Button — nur sichtbar wenn Eingabe vorhanden */}
      {value && (
        <button
          className={styles.searchbar__clear}
          onClick={handleClear}
          aria-label="Suche zurücksetzen"
        >
          <FiX size={15} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
