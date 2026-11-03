import { FiUser, FiFlag, FiTrash2, FiCheck, FiCornerDownLeft, FiRefreshCw } from 'react-icons/fi'
import { useAppContext } from '../../../context/AppContext'
import styles from './AufgabeCard.module.css'

// Konfiguration für Prioritäten — außerhalb der Komponente, konstante Daten
const PRIORITY_CONFIG = {
  hoch:    { label: 'Hoch',    className: 'priority--hoch'    },
  mittel:  { label: 'Mittel',  className: 'priority--mittel'  },
  niedrig: { label: 'Niedrig', className: 'priority--niedrig' },
}

// Konfiguration für Status-Anzeige
const STATUS_CONFIG = {
  offen:         { label: 'Offen'          },
  inBearbeitung: { label: 'In Bearbeitung' },
  erledigt:      { label: 'Erledigt'       },
}

const AufgabeCard = ({ task }) => {
  const { employees, takeTask, completeTask, returnTask, reopenTask, deleteTask } = useAppContext()

  // Zugewiesenen Mitarbeiter aus der Liste suchen
  const assignedEmployee = employees.find(emp => emp.id === task.assignedTo) || null

  // Nur aktive Mitarbeiter können Aufgaben übernehmen
  const activeEmployees = employees.filter(emp => emp.status === 'aktiv')

  const priority = PRIORITY_CONFIG[task.priority]
  const status   = STATUS_CONFIG[task.status]

  return (
    <article className={styles.card}>

      {/* Priorität und Status */}
      <div className={styles.card__header}>
        <span className={`${styles.card__priority} ${styles[priority.className]}`}>
          <FiFlag size={11} />
          {priority.label}
        </span>
        <span className={`${styles.card__status} ${styles[`status--${task.status}`]}`}>
          {status.label}
        </span>
      </div>

      {/* Titel und Beschreibung */}
      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{task.title}</h3>
        <p className={styles.card__description}>{task.description}</p>
      </div>

      {/* Zugewiesener Mitarbeiter */}
      <div className={styles.card__assignee}>
        <FiUser size={13} className={styles.card__assignee__icon} />
        {assignedEmployee ? (
          <span className={styles.card__assignee__name}>{assignedEmployee.name}</span>
        ) : (
          <span className={styles.card__assignee__empty}>Nicht zugewiesen</span>
        )}
      </div>

      {/* Aktionen — abhängig vom Status der Aufgabe */}
      <div className={styles.card__actions}>

        {/* Status: offen → Mitarbeiter auswählen und Aufgabe übernehmen */}
        {task.status === 'offen' && (
          <select
            className={styles.card__select}
            defaultValue=""
            onChange={e => {
              if (e.target.value) takeTask(task.id, Number(e.target.value))
            }}
          >
            <option value="" disabled>Mitarbeiter wählen</option>
            {activeEmployees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        )}

        {/* Status: inBearbeitung → Erledigen oder Zurückgeben */}
        {task.status === 'inBearbeitung' && (
          <>
            <button className="btn-success" onClick={() => completeTask(task.id)}>
              <FiCheck size={14} />
              Erledigen
            </button>
            <button className="btn-secondary" onClick={() => returnTask(task.id)}>
              <FiCornerDownLeft size={14} />
              Zurückgeben
            </button>
          </>
        )}

        {/* Status: erledigt → Wieder aufnehmen */}
        {task.status === 'erledigt' && (
          <button className="btn-secondary" onClick={() => reopenTask(task.id)}>
            <FiRefreshCw size={14} />
            Wieder aufnehmen
          </button>
        )}

        {/* Löschen — immer verfügbar */}
        <button
          className={styles['card__btn--danger']}
          onClick={() => deleteTask(task.id)}
          aria-label="Aufgabe löschen"
        >
          <FiTrash2 size={14} />
        </button>

      </div>

    </article>
  )
}

export default AufgabeCard
