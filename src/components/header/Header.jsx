import React, { useState, useEffect } from 'react';
import { ThemeSwitcher } from '../themeSwitcher/ThemeSwitcher.jsx';
import headerLogo from '../../assets/tools.png';
import styles from './Header.module.css';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleResize = () => {
        if (window.innerWidth > 767) {
            setIsMenuOpen(false);
        }
    };

    const handleLinkClick = (id) => {
        setIsMenuOpen(false);

        const section = document.getElementById(id);
        if (section) {
            // Отримання значення CSS-змінної --header-height
            const root = document.documentElement;
            const headerHeight = parseInt(
                    getComputedStyle(root).getPropertyValue('--header-height'),
                    10
            );

            const offset = -headerHeight; // Використовуємо значення змінної
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = sectionPosition + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.header__inner_left}>
                        <img
                                className={styles.logo}
                                src={headerLogo}
                                alt="logo"
                                width={40}
                                height={40}
                        />
                        <ThemeSwitcher />
                    </div>
                    <button className={styles.burger} onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <nav
                            className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}
                    >
                        <ul className={styles.navList}>
                            <li>
                                <button
                                        className={styles.linkButton}
                                        onClick={() => handleLinkClick('about')}
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                        className={styles.linkButton}
                                        onClick={() => handleLinkClick('services')}
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                        className={styles.linkButton}
                                        onClick={() => handleLinkClick('contact')}
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
};
