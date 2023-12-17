import React from "react";
import { Link } from "gatsby";
import Logo from './Logo';

const Header = ({ title }) => {
    return (
        <header className="global-header">
            <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <Logo width="100" height="100" className="custom-logo-class"/>
            </Link>
            {/* 여기에 추가적인 메뉴나 로고 등을 넣어주세요 */}
            </nav>
        </header>
    );
};

export default Header
