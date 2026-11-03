import { useMemo } from 'react'
import { useAppContext } from '../../context/AppContext'
import AufgabeList from '../../components/aufgaben/AufgabeList/AufgabeList'
import styles from './AufgabenPage.module.css'

const AufgabenPage = () => {
  const { tasks } = useAppContext()

  // Nur offene Aufgaben anzeigen
  const offeneTasks = useMemo(
    () => tasks.filter(task => task.status === 'offen'),
    [tasks]
  )

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <div className={styles.page__title}>
          <h1>Aufgaben</h1>
          <span className={styles.page__count}>{offeneTasks.length} offen</span>
        </div>
      </div>

      <AufgabeList
        tasks={offeneTasks}
        emptyText="Keine offenen Aufgaben vorhanden"
      />
    </div>
  )
}

export default AufgabenPage
