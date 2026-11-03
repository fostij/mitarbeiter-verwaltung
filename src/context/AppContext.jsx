import { createContext, useContext, useReducer, useState, useEffect } from 'react'


// Reducer für Aufgaben — verwaltet alle Statusübergänge
const tasksReducer = (state, action) => {
  switch (action.type) {

    // Anfangsdaten aus der JSON-Datei laden
    case 'SET_TASKS':
      return action.payload

    // Mitarbeiter übernimmt eine Aufgabe → Status: inBearbeitung
    case 'TAKE_TASK':
      return state.map(task =>
        task.id === action.payload.taskId
          ? { ...task, status: 'inBearbeitung', assignedTo: action.payload.employeeId }
          : task
      )

    // Aufgabe abschließen → Status: erledigt
    case 'COMPLETE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, status: 'erledigt' }
          : task
      )

    // Aufgabe zurückgeben → Status: offen, Mitarbeiter wird entfernt
    case 'RETURN_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, status: 'offen', assignedTo: null }
          : task
      )

    // Erledigte Aufgabe wieder aufnehmen → Status: inBearbeitung
    case 'REOPEN_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, status: 'inBearbeitung' }
          : task
      )

    // Neue Aufgabe hinzufügen
    case 'ADD_TASK':
      return [...state, action.payload]

    // Aufgabe löschen
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload)

    default:
      return state
  }
}


// Context erstellen
const AppContext = createContext(null)


// Provider-Komponente — stellt Daten für die gesamte App bereit
export const AppProvider = ({ children }) => {

  // useState für Mitarbeiter — einfache CRUD-Operationen ohne komplexe Übergänge
  const [employees, setEmployees] = useState([])

  // useReducer für Aufgaben — komplexe Statusübergänge zwischen offen/inBearbeitung/erledigt
  const [tasks, dispatch] = useReducer(tasksReducer, [])

  // Anfangsdaten beim Start der App laden
  useEffect(() => {
    fetch('/src/data/employees.json')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Fehler beim Laden der Mitarbeiter:', err))

    fetch('/src/data/tasks.json')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_TASKS', payload: data }))
      .catch(err => console.error('Fehler beim Laden der Aufgaben:', err))
  }, [])

  // Mitarbeiter-Aktionen

  const addEmployee = (employee) => {
    setEmployees(prev => [...prev, { ...employee, id: Date.now() }])
  }

  const updateEmployee = (updated) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === updated.id ? updated : emp)
    )
  }

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  // Aufgaben-Aktionen (über dispatch)

  const takeTask = (taskId, employeeId) => {
    dispatch({ type: 'TAKE_TASK', payload: { taskId, employeeId } })
  }

  const completeTask = (taskId) => {
    dispatch({ type: 'COMPLETE_TASK', payload: taskId })
  }

  const returnTask = (taskId) => {
    dispatch({ type: 'RETURN_TASK', payload: taskId })
  }

  const reopenTask = (taskId) => {
    dispatch({ type: 'REOPEN_TASK', payload: taskId })
  }

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }

  // Alle Werte die aus jedem Komponenten zugänglich sind

  const value = {
    // Daten
    employees,
    tasks,
    // Employees
    addEmployee,
    updateEmployee,
    // Functions
    deleteEmployee,
    takeTask,
    completeTask,
    returnTask,
    reopenTask,
    deleteTask,
  }

  return (
    <AppContext.Provider value={value}>
      { children }
    </AppContext.Provider>
  )
}


// Custom Hook — vereinfacht den Zugriff auf den Context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext muss innerhalb eines AppProviders verwendet werden')
  }
  return context
}
