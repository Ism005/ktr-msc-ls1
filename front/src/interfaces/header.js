import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="head">
            <nav className="crumbs">
                <div className="container">
                    <Link  className="nav-item"  to="/">Business card manager</Link>
                    <Link to=""></Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;