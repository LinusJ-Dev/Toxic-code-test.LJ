import React from 'react';
import { HeaderProps } from '../types/header';

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header>
            <span className="appTitle">Unnamed Movie App</span>
            {children}
        </header>
    );
};

export default Header;