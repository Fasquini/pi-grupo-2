import React, { Component } from "react"

class FormBusqueda extends Component {
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
            <form className="formBuscar" onSubmit={(event) => this.evitarSubmit(event)}>
                <input className="inputBuscar" type="text" placeholder="Buscar..." value={this.state.valor} onChange={(event) => this.controlarCambios(event)}/>

                <button className="botonBuscar" type="submit">Buscar</button>
            </form>
        );
    }
}

export default FormBusqueda