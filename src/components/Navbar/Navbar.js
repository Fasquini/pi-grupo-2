import React from "react";
import Cookies from "universal-cookie";
import LiNavbar from "../LiNavbar/LiNavbar";
const cookie = new Cookies()

function Navbar() {
    let menu = cookie.get("user-auth-cookie") !== undefined ? [
        { name: "Home", path: "/", clase: "" },
        { name: "Populares", path: "/Populares", clase: "" },
        { name: "Top Rated", path: "/TopRated", clase: "" },
        { name: "Pronto", path: "/Pronto", clase: "" },
        { name: "Favoritos", path: "/Favoritas", clase: "" } 
    ]
    : [
        { name: "Home", path: "/", clase: "" },
        { name: "Populares", path: "/Populares", clase: "" },
        { name: "Top Rated", path: "/TopRated", clase: "" },
        { name: "Pronto", path: "/Pronto", clase: "" }
    ]
    

    let lr = [
        { name: "Registro", path: "/Registro", clase: "Registro" },
        { name: "Login", path: "/Login", clase: "Login" }
    ];

    let usuario = cookie.get("user-auth-cookie");

    return (
        <nav>
            <ul className="">
                <LiNavbar name={menu} />
            </ul>

            <ul>
                {usuario === undefined ? (
                    <LiNavbar name={lr} />
                ) : (
                    <li className="usuarioLogueado">
                        <img src="/img/fotoDePerfil.png" className="fotoDePerfil" alt="foto de perfil"/>
                        <p>{usuario}</p>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;