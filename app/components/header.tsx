import React from 'react';
import { HeaderProps } from '../types/header';

import styles from './header.module.css';

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <div className={styles.headerWrapper}>
            <header className={styles.header}>
                <span className={styles.appTitle}>Unnamed Movie App</span>
                {children}
            </header>
        </div>
    );
};

export default Header;