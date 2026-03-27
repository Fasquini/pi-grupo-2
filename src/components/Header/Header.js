import React from "react"

import Navbar from "../Navbar/Navbar"

function Header() {
    return (
        <>
            <div id="divTitulo">
                <h1>Pelis ARN</h1>
                <img id="logo" src="../img/logo.png" alt="logo"/>
            </div>
            
            <Navbar />
        </>
    )
}

export default Header 