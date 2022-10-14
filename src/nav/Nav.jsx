import React from "react"
import { NavLink } from "react-router-dom"
import "./Nav.css"
import brain from "../assets/brain.svg"


function Nav() {
    return (
        <nav>
            <span className="logo-span">
                <img src={brain} alt="brain logo"></img>
                MindSet
            </span>

            <span className="link-span">
                <NavLink to="/" end>Meditate</NavLink>
                <NavLink to="/park">Fresh Air</NavLink>
                <NavLink to="/journal">Gratitude</NavLink>
            </span>

        </nav>
    )
}

export default Nav