import React from "react";
import { Link, NavLink } from "react-router-dom"
import avatar_icon from '../images/avatar-icon.png'

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">#VANLIFE</Link>
            <nav>
                <NavLink to="/">Host</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/vans">Vans</NavLink>
                <Link className="login-link" to="/login">
                    <img
                        src={avatar_icon}
                        className="login-icon"
                    />
                </Link>
            </nav>
        </header>
    )
}