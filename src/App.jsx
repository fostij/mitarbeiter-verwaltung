import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/shared/Navbar/Navbar';
import MitarbeiterPage from './pages/MitarbeiterPage/MitarbeiterPage';
import AufgabenPage from './pages/AufgabenPage/AufgabenPage';
import InBearbeitungPage from './pages/InBearbeitungPage/InBearbeitungPage';
import ErledigteAufgabenPage from './pages/ErledigteAufgabenPage/ErledigteAufgabenPage';
import styles from './App.module.css';

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/"                   element={<MitarbeiterPage />}       />
          <Route path="/aufgaben"           element={<AufgabenPage />}          />
          <Route path="/in-bearbeitung"     element={<InBearbeitungPage />}     />
          <Route path="/erledigte-aufgaben" element={<ErledigteAufgabenPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
