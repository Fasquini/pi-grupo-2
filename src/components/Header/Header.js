import { Link } from "react-router-dom";
import React from "react"

import Navbar from "../Navbar/Navbar"

function Header() {
    return (
        <>
            <div id="divTitulo">
                <Link to="/">
                    <img id="logo" src="../img/ARNMAX_5.png" alt="logo"/>
                </Link>
            </div>
            
            <Navbar />
        </>
    )
}

export default Header 