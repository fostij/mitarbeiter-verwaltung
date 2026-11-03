import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext.jsx'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* AppProvider umschließt die gesamte App — alle Komponenten haben Zugriff auf den Context */}
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
