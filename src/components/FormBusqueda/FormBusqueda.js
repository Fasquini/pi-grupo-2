import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";

function FormBusqueda (props){
    const [tipo, setTipo] = useState("movie")
    const [valor, setValor] = useState("")

    function evitarSubmit(event){
        event.preventDefault()
        if(tipo!== "" && tipo!== " " ){
            props.history.push("/Resultados/" + tipo + "/" + valor);
        }
    }

    function controlarCambios(event) {
        setValor(event.target.value)
    }

    function controlarSelect(event) {
        setTipo(event.target.value)}
   
    return (
            <form
                className="formBuscar"
                onSubmit={(event) => evitarSubmit(event)}
            >
                <input
                    className="inputBuscar"
                    type="text"
                    placeholder="Buscar..."
                    value={valor}
                    onChange={(event) => controlarCambios(event)}
                />

                <select className="selectBuscar" value={tipo}
                    onChange={(event) => controlarSelect(event)}>
                    <option value="movie" >Peliculas</option>
                    <option value="tv" >Series</option>
                </select>

                <button className="botonBuscar" type="submit">
                    Buscar
                </button>
            </form>
        );
    }

export default withRouter(FormBusqueda);