# Mitarbeiter Verwaltung

Eine React-Anwendung zur Verwaltung von Mitarbeitern und Aufgaben.
Entwickelt als Abschlussprojekt im React-Kurs an der Hochschule Hannover.

---

## Funktionen

**Mitarbeiter**
- Alle Mitarbeiter werden beim Start per `fetch` aus einer lokalen JSON-Datei geladen
- Neuen Mitarbeiter über ein Modalformular mit der `FormData`-API hinzufügen
- Mitarbeiter bearbeiten und löschen (mit Löschbestätigung)
- Echtzeit-Suche nach Name oder Rolle
- Filterung nach Abteilung
- Paginierung — 6 Mitarbeiter pro Seite

**Aufgaben**
- Alle offenen Aufgaben mit Prioritäts- und Statusanzeige einsehen
- Aufgabe einem aktiven Mitarbeiter über ein Dropdown direkt auf der Karte zuweisen
- Aufgaben zwischen Statuswerten verschieben: Offen → In Bearbeitung → Erledigt
- Aufgabe aus „In Bearbeitung" zurück zu „Offen" geben
- Erledigte Aufgabe wieder in „In Bearbeitung" aufnehmen
- Aufgaben aus jedem Status löschen

---

## Technologien

| Technologie       | Verwendungszweck                  |
|-------------------|-----------------------------------|
| React 18          | UI-Bibliothek                     |
| Vite              | Build-Tool und Entwicklungsserver |
| React Router v6   | Client-seitiges Routing           |
| CSS Modules       | Komponentenspezifische Stile      |
| React Icons       | Icon-Bibliothek (Feather Icons)   |
| Context API       | Globale Zustandsverwaltung        |

---

## Verwendete React-Konzepte

| Konzept      | Einsatzort                                                        |
|--------------|-------------------------------------------------------------------|
| `useState`   | Formularfelder, Modal-Zustand, Paginierung, Suchanfrage           |
| `useEffect`  | JSON-Daten beim Start laden, Seite bei Filterwechsel zurücksetzen |
| `useReducer` | Statusübergänge der Aufgaben (offen → inBearbeitung → erledigt)  |
| `useContext` | Globaler Zugriff ohne Prop Drilling                               |
| `useMemo`    | Gefilterte und paginierte Listen                                  |
| `useRef`     | Fokusverwaltung in der Suchleiste                                 |
| `FormData`   | Natives JS-API zur Formularverarbeitung                           |

---

## Projektstruktur

```
src/
├── components/
│   ├── mitarbeiter/
│   │   ├── MitarbeiterCard/
│   │   ├── MitarbeiterForm/
│   │   └── MitarbeiterList/
│   ├── aufgaben/
│   │   ├── AufgabeCard/
│   │   └── AufgabeList/
│   └── shared/
│       ├── Navbar/
│       ├── SearchBar/
│       ├── FilterBar/
│       └── Pagination/
├── context/
│   └── AppContext.jsx
├── data/
│   ├── employees.json
│   └── tasks.json
├── pages/
│   ├── MitarbeiterPage/
│   ├── AufgabenPage/
│   ├── InBearbeitungPage/
│   └── ErledigteAufgabenPage/
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

---

## Installation

```bash
# Repository klonen
git clone https://github.com/fostij/mitarbeiter-verwaltung.git
cd mitarbeiter-verwaltung

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Anwendung im Browser öffnen: [http://localhost:5173](http://localhost:5173)

---

## Seiten

| Route                   | Seite                | Beschreibung                         |
|-------------------------|----------------------|--------------------------------------|
| `/`                     | Mitarbeiter          | Mitarbeiterliste mit CRUD-Funktionen |
| `/aufgaben`             | Aufgaben             | Offene Aufgaben zur Übernahme        |
| `/in-bearbeitung`       | In Bearbeitung       | Aktuell bearbeitete Aufgaben         |
| `/erledigte-aufgaben`   | Erledigte Aufgaben   | Abgeschlossene Aufgaben              |

---

## Aufgaben-Statusablauf

```
offen ──[Übernehmen]──► inBearbeitung ──[Erledigen]──► erledigt
         ▲                    │                              │
         └────[Zurückgeben]───┘        [Wieder aufnehmen]───┘
```

---

## Architekturentscheidungen

**Context API statt Prop Drilling**
Alle Daten werden im `AppContext` gespeichert und sind aus jedem Komponenten direkt zugänglich — ohne Weitergabe über zwischenliegende Komponenten.

**`useReducer` für Aufgaben**
Aufgaben durchlaufen einen klar definierten Statusablauf. `useReducer` zentralisiert diese Logik mit eindeutigen Action-Typen.

**`useState` für Mitarbeiter**
Mitarbeiteroperationen sind einfache CRUD-Aktionen — `useState` ist hier ausreichend und übersichtlicher.

**Bedingtes Rendering in `AufgabeCard`**
Die Karte prüft den Status der Aufgabe und zeigt die entsprechenden Aktions-Buttons an. Ein Komponente für alle drei Seiten — kein doppelter Code.

**CSS Modules**
Jeder Komponent hat eine eigene `.module.css`-Datei im selben Ordner. Stile sind gekapselt und es gibt keine Namenskonflikte.

---

## Autor

**Oleh Fostii**
Hochschule Hannover — Fakultät III, Medien, Information und Design
App-Entwicklung — React-Kurs, 2026
