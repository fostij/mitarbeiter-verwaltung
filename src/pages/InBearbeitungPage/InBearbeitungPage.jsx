import { useMemo } from 'react'
import { useAppContext } from '../../context/AppContext'
import AufgabeList from '../../components/aufgaben/AufgabeList/AufgabeList'
import styles from './InBearbeitungPage.module.css'

const InBearbeitungPage = () => {
  const { tasks } = useAppContext()

  // Nur Aufgaben die gerade bearbeitet werden
  const inBearbeitungTasks = useMemo(
    () => tasks.filter(task => task.status === 'inBearbeitung'),
    [tasks]
  )

  return (
    <div className={styles.page}>
      <div className={styles.page__header}>
        <div className={styles.page__title}>
          <h1>In Bearbeitung</h1>
          <span className={styles.page__count}>{inBearbeitungTasks.length} aktiv</span>
        </div>
      </div>

      <AufgabeList
        tasks={inBearbeitungTasks}
        emptyText="Keine Aufgaben in Bearbeitung"
      />
    </div>
  )
}

export default InBearbeitungPage
