import React, { Component } from "react"
import { Link } from "react-router-dom";

class TarjetaPeliculas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verMas: false
        }
    }

    VerMas() {
        this.setState({
            verMas: !this.state.verMas
        })
    }

    render() {
        return (<>
            {
                <article className='tarjetaPeli'>
                    <img className="imgTarjetas" src={this.props.img} alt={this.props.name} />
                    <h3> {this.props.name}</h3>
                    
                    {this.state.verMas === true ? <div className='verMas'>
                        <p>{this.props.desc} </p> </div> : ""}
                    <button className='botonMas' onClick={() => this.VerMas()}> {this.state.verMas === true ? "Ver menos" : "Ver más"}</button>
                    
                    <ul><li><Link to={`/UnaPelicula/${this.props.id}`}>Ir a detalle</Link></li></ul>

                    <button className='botonFav' >Agregar a favoritos</button>

                </article>

            }
        </>
        )
    }
}

export default TarjetaPeliculas