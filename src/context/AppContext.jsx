import { createContext, useContext, useReducer, useState, useEffect } from 'react';



// Tasks Reducer - verwaltet alle Statusänderungen der Aufgaben
const tasksReducer = (state, action) => {
    switch(action.type) {
        // Laden der Startdaten aus JSON
        case 'SET_TASKS':
            return action.payload

        // Ein Mitarbeiter übernimmt eine Aufgabe -> Status: in Bearbeitung
        case 'TAKE_TASKS': 
            return state.map(task => 
                task.id === action.payload.taskId
                ? { ...task, status: 'inBearbeitung', assignedTo:
                    action.payload.employeeId }
                : task
            )

        // Aufgabe erledigt -> Status: erledigt 
        case 'COMPLETE_TASK':
            return state.map(task =>
                task.id === action.payload
                ? { ...task, status: 'erledigt' }
                : task
            )

        // Aufgabe zurückgeben -> Sattus: offen, Bearbeiter wird gelöscht
        case 'RETURN_TASK':
            return state.map(task => 
                task.id === action.payload
                ? { ...task, status: 'offen', assignedTo: null }
                : task
            )

        // Status von "erledigt" auf "in Bearbeitung" zurücksetzen
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
            return state.filter(task => 
                task.id !== action.payload)
        
        default: 
            return state
    }

}

// Context erstellen
const AppContext = createContext(null)

// Provider
export const AppProvider = ({ children }) => {
    // Mitarbeiter - einfaches `useState`, da die Logik keine komplexen Übergänge beinhaltet
    const [employees, setEmployees] = useState([])

    // Aufgaben - useReducer, da die Logik der Übergänge zwischen den Zuständen komplex ist
    const [tasks, dispatch] = useReducer(tasksReducer, [])

    // Wir laden die Ausgangsdaten aus den JSON-Dateien
    useEffect(() => {
        fetch('src/data/employees.json')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.error('Fehler beim Laden der Mitarbeiter:', err))

        fetch('src/data/tasks.json')
            .then(res => res.json())
            .then(data => dispatch({ type: 'SET_TASKS', payload: data }))
            .catch(err => console.error('Fehler beim Laden der Aufgaben', err))
    }, [])


    // Employee actions
    const addEmployee = (employee) => {
        const newEmployee = {
            ...employee,
            id: Date.now(),
        }
        setEmployees(prev => [...prev, newEmployee])
    }

    const updateEmployee = (updatedEmployee) => {
        setEmployees(prev => 
            prev.map(emp => 
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            )
        )
    }

    const deleteEmployee = (id) => {
        setEmployees(prev => prev.filter(emp => emp.id !== id))
    }


    // Task actions - wegen dispatch
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

    const addTask = (task) => {
        dispatch({
            type: 'ADD_TASK',
            payload: {...task, id: Date.now(), status: 'offen', assignedTo: null}
        })
    }

    const deleteTask = (taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId })
    }


    // Value - alles, was von einer beliebigen Komponente aus verfügbar ist

    const value = {
        // Daten
        employees,
        tasks,
        // Employee actions
        addEmployee,
        updateEmployee,
        deleteEmployee,
        // Task actions
        takeTask,
        completeTask,
        returnTask,
        reopenTask,
        addTask,
        deleteTask,
    }


    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

// Custom hook - um nicht überall useContext + AppContext importieren zu müssen
export const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useAppContext must be used within AppProvider')
    }

    return context
}
