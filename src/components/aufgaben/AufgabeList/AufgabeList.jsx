import { FiInbox } from 'react-icons/fi'
import AufgabeCard from '../AufgabeCard/AufgabeCard'
import styles from './AufgabeList.module.css'

const AufgabeList = ({ tasks, emptyText }) => {
  // Leerzustand — wenn keine Aufgaben vorhanden sind
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <FiInbox size={40} className={styles.empty__icon} />
        <p className={styles.empty__text}>{emptyText}</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {tasks.map(task => (
        <AufgabeCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default AufgabeList
