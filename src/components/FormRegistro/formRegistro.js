import React, { Component } from "react"

class FormRegistro extends Component {
    constructor() {
        super();
        this.state = {
            valor: ""
        }
    }

    evitarSubmit(event) {
        event.preventDefault();
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value });
    }

    render() {
        return (
            <form onSubmit={(event) => this.evitarSubmit(event)}>
                <input className="" type="Email" placeholder="Ingrese su email" value={this.state.valor}/>
                 <input className="inputBuscar" type="Password" placeholder="Cree una contraseña" value={this.state.valor} />
                <button className="botonCrearCuenta" type="submit">Crear cuenta</button>
            </form>
        );
    }
}

export default FormRegistro