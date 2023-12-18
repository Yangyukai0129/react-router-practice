import React from "react";
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link to="/">#VANLIFE</Link>
            <nav>
                <NavLink to="/">Host</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/vans">Vans</NavLink>
                <NavLink to="/login"></NavLink>
            </nav>
        </header>
    )
}