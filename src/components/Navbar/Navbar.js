import React from "react"

import LiNavbar from "../LiNavbar/LiNavbar"

function Navbar() {
    let menu = [{ name: "Home", path: "/", clase:"" }, { name: "Populares", path: "/Populares", clase:"" }, { name: "Top Rated", path: "/TopRated", clase:"" },{ name: "Pronto", path: "/Pronto", clase:""}, { name: "Registro", path: "/Registro", clase:"Registro" }, { name: "Login", path: "/Login", clase:"Login" }]

    return (
        <nav>
            <ul>
                <LiNavbar name={menu} />
            </ul>
        </nav>
    )

}

export default Navbar