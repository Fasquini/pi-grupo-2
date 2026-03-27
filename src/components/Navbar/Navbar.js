import React from "react"

import LiNavbar from "../LiNavbar/LiNavbar"

function Navbar() {
    let menu = [{ name: "Home", path: "/", clase:"" }, { name: "Favoritas", path: "/Favoritas", clase:"" }, { name: "Registro", path: "/Registro", clase:"empujarDerecha" }, { name: "Login", path: "/Login", clase:"" }]

    return (
        <nav>
            <ul>
                <LiNavbar name={menu} />
            </ul>
        </nav>
    )

}

export default Navbar