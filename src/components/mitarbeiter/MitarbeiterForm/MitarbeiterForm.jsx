import { useState, useEffect } from 'react'
import { FiX, FiSave, FiUserPlus } from 'react-icons/fi'
import { useAppContext } from '../../../context/AppContext'
import styles from './MitarbeiterForm.module.css'

const DEPARTMENTS = ['IT', 'Design', 'Management', 'HR', 'Marketing', 'Finanzen']

// Leerer Anfangszustand des Formulars
const INITIAL_STATE = {
  name: '', role: '', department: '', email: '', phone: '', status: 'aktiv',
}

const MitarbeiterForm = ({ editingEmployee, onClose }) => {
  const { addEmployee, updateEmployee } = useAppContext()

  // useState für Formularfelder — einfache unabhängige Werte
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors,   setErrors  ] = useState({})

  const isEditing = Boolean(editingEmployee)

  // Formular mit Mitarbeiterdaten befüllen wenn Bearbeitung geöffnet wird
  useEffect(() => {
    setFormData(editingEmployee ?? INITIAL_STATE)
    setErrors({})
  }, [editingEmployee])

  // Feldwert ändern und zugehörigen Fehler entfernen
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Pflichtfelder validieren
  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim())       newErrors.name       = 'Name ist erforderlich'
    if (!formData.role.trim())       newErrors.role       = 'Rolle ist erforderlich'
    if (!formData.department)        newErrors.department = 'Abteilung ist erforderlich'
    if (!formData.email.trim())      newErrors.email      = 'E-Mail ist erforderlich'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                     newErrors.email      = 'Ungültige E-Mail-Adresse'
    if (!formData.phone.trim())      newErrors.phone      = 'Telefon ist erforderlich'
    return newErrors
  }

  // Formular absenden — FormData API für native Formularverarbeitung
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // FormData — natives JavaScript-API zur Datenerfassung aus dem Formular
    const data = new FormData(e.target)
    const employee = {
      name:       data.get('name').trim(),
      role:       data.get('role').trim(),
      department: data.get('department'),
      email:      data.get('email').trim(),
      phone:      data.get('phone').trim(),
      status:     data.get('status'),
    }

    if (isEditing) {
      updateEmployee({ ...employee, id: editingEmployee.id })
    } else {
      addEmployee(employee)
    }

    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Modal-Header */}
        <div className={styles.modal__header}>
          <div className={styles.modal__title}>
            {isEditing ? <FiSave size={18} /> : <FiUserPlus size={18} />}
            <h2>{isEditing ? 'Mitarbeiter bearbeiten' : 'Neuer Mitarbeiter'}</h2>
          </div>
          <button className={styles.modal__close} onClick={onClose} aria-label="Schließen">
            <FiX size={20} />
          </button>
        </div>

        {/* Formular */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="name">
              Name <span className={styles.form__required}>*</span>
            </label>
            <input
              className={`${styles.form__input} ${errors.name ? styles['form__input--error'] : ''}`}
              id="name" name="name" type="text"
              placeholder="z. B. Anna Müller"
              value={formData.name} onChange={handleChange}
            />
            {errors.name && <span className={styles.form__error}>{errors.name}</span>}
          </div>

          {/* Rolle */}
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="role">
              Rolle <span className={styles.form__required}>*</span>
            </label>
            <input
              className={`${styles.form__input} ${errors.role ? styles['form__input--error'] : ''}`}
              id="role" name="role" type="text"
              placeholder="z. B. Entwicklerin"
              value={formData.role} onChange={handleChange}
            />
            {errors.role && <span className={styles.form__error}>{errors.role}</span>}
          </div>

          {/* Abteilung + Status */}
          <div className={styles.form__row}>
            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="department">
                Abteilung <span className={styles.form__required}>*</span>
              </label>
              <select
                className={`${styles.form__select} ${errors.department ? styles['form__input--error'] : ''}`}
                id="department" name="department"
                value={formData.department} onChange={handleChange}
              >
                <option value="">Bitte wählen</option>
                {DEPARTMENTS.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
              {errors.department && <span className={styles.form__error}>{errors.department}</span>}
            </div>

            <div className={styles.form__group}>
              <label className={styles.form__label} htmlFor="status">Status</label>
              <select
                className={styles.form__select}
                id="status" name="status"
                value={formData.status} onChange={handleChange}
              >
                <option value="aktiv">Aktiv</option>
                <option value="inaktiv">Inaktiv</option>
              </select>
            </div>
          </div>

          {/* E-Mail */}
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="email">
              E-Mail <span className={styles.form__required}>*</span>
            </label>
            <input
              className={`${styles.form__input} ${errors.email ? styles['form__input--error'] : ''}`}
              id="email" name="email" type="email"
              placeholder="z. B. a.mueller@firma.de"
              value={formData.email} onChange={handleChange}
            />
            {errors.email && <span className={styles.form__error}>{errors.email}</span>}
          </div>

          {/* Telefon */}
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="phone">
              Telefon <span className={styles.form__required}>*</span>
            </label>
            <input
              className={`${styles.form__input} ${errors.phone ? styles['form__input--error'] : ''}`}
              id="phone" name="phone" type="tel"
              placeholder="z. B. +49 511 1234567"
              value={formData.phone} onChange={handleChange}
            />
            {errors.phone && <span className={styles.form__error}>{errors.phone}</span>}
          </div>

          {/* Footer */}
          <div className={styles.form__footer}>
            <button type="button" className={styles['form__btn--secondary']} onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className={styles['form__btn--primary']}>
              {isEditing ? 'Speichern' : 'Hinzufügen'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default MitarbeiterForm
