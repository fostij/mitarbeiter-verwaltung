import { NavLink } from "react-router";
import { FiBriefcase, FiList, FiLoader, FiCheckCircle } from "react-icons/fi";
import styles from './Navbar.module.css';


const navItems = [
    { to: '/',               label: 'Mitarbeiter',            icon: <FiBriefcase /> },
    { to: '/aufgaben',       label: 'Aufgaben',               icon: <FiList />      },
    { to: '/in-bearbeitung', label: 'In Bearbeitung',         icon: <FiLoader />    },
    { to: '/erledigte-aufgaben', label: 'Erledigte Aufgaben', icon: <FiCheckCircle /> },
]



const Navbar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.logo}>
                    <span className={styles.logo__icon}>⚙︎</span>
                    <span className={styles.logo__text}>Verwaltung</span>
                </div>

                <nav className={styles.nav}>
                    {navItems.map(item => (
                        <NavLink 
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({isActive}) =>
                            `${styles.nav__link} ${isActive ? styles['nav__link--active'] : ''}`
                            }
                        >

                            <span className={styles.nav__icon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                
            </div>
        </header>
    )
}

export default Navbar