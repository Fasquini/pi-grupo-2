import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor: ""
        };
    }

    evitarSubmit(event) {
        event.preventDefault();

        if (this.state.valor !== "" && this.state.valor !== " ") {
            this.props.history.push("/Resultados/" + this.state.valor);
        }
    }

    controlarCambios(event) {
        this.setState({
            valor: event.target.value
        });
    }

    render() {
        return (
            <form
                className="formBuscar"
                onSubmit={(event) => this.evitarSubmit(event)}
            >
                <input
                    className="inputBuscar"
                    type="text"
                    placeholder="Buscar..."
                    value={this.state.valor}
                    onChange={(event) => this.controlarCambios(event)}
                />

                <button className="botonBuscar" type="submit">
                    Buscar
                </button>
            </form>
        );
    }
}

export default withRouter(FormBusqueda);