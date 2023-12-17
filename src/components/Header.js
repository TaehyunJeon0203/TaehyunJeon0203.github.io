import React from "react";
import { Link } from "gatsby";
import Logo from './Logo';

const Header = ({ title }) => {
    return (
        <header className="global-header">
            <Link to="/">
                <Logo width="90" height="" />
            </Link>
        </header>
    );
};

export default Header
