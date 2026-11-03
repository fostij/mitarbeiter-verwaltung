import { useState } from 'react'
import { FiMail, FiPhone, FiBriefcase, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useAppContext } from '../../../context/AppContext'
import styles from './MitarbeiterCard.module.css'

const MitarbeiterCard = ({ employee, onEdit }) => {
  const { deleteEmployee } = useAppContext()

  // Löschbestätigung — verhindert versehentliches Löschen
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    if (confirmDelete) {
      deleteEmployee(employee.id)
    } else {
      setConfirmDelete(true)
    }
  }

  return (
    <article className={styles.card}>

      {/* Avatar — erster Buchstabe des Namens */}
      <div className={styles.card__avatar}>
        {employee.name.charAt(0)}
      </div>

      {/* Mitarbeiter-Informationen */}
      <div className={styles.card__info}>
        <h3 className={styles.card__name}>{employee.name}</h3>
        <span className={styles.card__role}>
          <FiBriefcase size={13} />
          {employee.role}
        </span>
        <span className={`${styles.card__status} ${styles[`card__status--${employee.status}`]}`}>
          {employee.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'}
        </span>
      </div>

      {/* Kontaktdaten */}
      <div className={styles.card__contacts}>
        <a href={`mailto:${employee.email}`} className={styles.card__contact}>
          <FiMail size={14} />
          <span>{employee.email}</span>
        </a>
        <a href={`tel:${employee.phone}`} className={styles.card__contact}>
          <FiPhone size={14} />
          <span>{employee.phone}</span>
        </a>
      </div>

      {/* Abteilung */}
      <div className={styles.card__department}>
        {employee.department}
      </div>

      {/* Aktionen */}
      <div className={styles.card__actions}>
        {confirmDelete ? (
          <>
            <span className={styles.card__confirm}>Sicher löschen?</span>
            <button className={styles['card__btn--danger']} onClick={handleDelete}>
              Ja
            </button>
            <button
              className={styles['card__btn--secondary']}
              onClick={() => setConfirmDelete(false)}
            >
              Nein
            </button>
          </>
        ) : (
          <>
            <button
              className={styles['card__btn--secondary']}
              onClick={() => onEdit(employee)}
              aria-label="Mitarbeiter bearbeiten"
            >
              <FiEdit2 size={15} />
            </button>
            <button
              className={styles['card__btn--danger']}
              onClick={handleDelete}
              aria-label="Mitarbeiter löschen"
            >
              <FiTrash2 size={15} />
            </button>
          </>
        )}
      </div>

    </article>
  )
}

export default MitarbeiterCard
