import React, { Component } from "react";
import Cookies from "universal-cookie";
import {withRouter } from "react-router-dom";
import LiNavbar from "../LiNavbar/LiNavbar";
const cookie = new Cookies()

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
        };
    }
    
    logOut() { 
        cookie.remove("user-auth-cookie") 
        this.props.history.push("/");
    }

    render() {
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
                            <img src="https://img.icons8.com/?size=100&id=82792&format=png&color=CC0A0A" onClick={() => this.logOut()} className="logOut" alt="foto de perfil" />
                            <img src="https://img.icons8.com/?size=100&id=85050&format=png&color=000000" className="fotoDePerfil" alt="foto de perfil" />
                            <p>{usuario}</p>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }

}

export default withRouter(Navbar);