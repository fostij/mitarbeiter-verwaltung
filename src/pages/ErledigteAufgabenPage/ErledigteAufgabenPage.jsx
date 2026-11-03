import { useMemo } from 'react'
import { useAppContext } from '../../context/AppContext'
import AufgabeList from '../../components/aufgaben/AufgabeList/AufgabeList'
import styles from './ErledigteAufgabenPage.module.css'

const ErledigteAufgabenPage = () => {
  const { tasks } = useAppContext()

  // Nur erledigte Aufgaben anzeigen
  const erledigteTasks = useMemo(
    () => tasks.filter(task => task.status === 'erledigt'),
    [tasks]
  )

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <div className={styles.page__title}>
          <h1>Erledigte Aufgaben</h1>
          <span className={styles.page__count}>{erledigteTasks.length} erledigt</span>
        </div>
      </div>

      <AufgabeList
        tasks={erledigteTasks}
        emptyText="Noch keine Aufgaben erledigt"
      />
    </div>
  )
}

export default ErledigteAufgabenPage
