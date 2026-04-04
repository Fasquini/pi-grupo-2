import React, { Component } from "react"

class UnaPelicula extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pelicula: ""
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=81dded2ba544d830e45caeb888ae898e&language=es-ES`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    pelicula: data
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="detalle-pelicula-container">
                {
                    this.state.pelicula === "" 
                        ? <img src="https://i.gifer.com/ZZ5H.gif" alt="loader" /> 
                        : null
                }

                {
                    this.state.pelicula !== "" 
                        ? (
                            <div>
                                <h2 className="detalle-pelicula-titulo">{this.state.pelicula.title}</h2>

                                <div className="detalle-pelicula-card">
                                    <img
                                        className="detalle-pelicula-img"
                                        src={`https://image.tmdb.org/t/p/w500${this.state.pelicula.poster_path}`}
                                        alt={this.state.pelicula.title}
                                    />

                                    <div className="detalle-pelicula-info">
                                        <h3 className="detalle-pelicula-subtitulo">Descripción</h3>

                                        <p className="detalle-pelicula-descripcion">
                                            {
                                                this.state.pelicula.overview !== ""
                                                ? this.state.pelicula.overview
                                                : "Sin sinopsis disponible"
                                            }
                                        </p>

                                        <p className="detalle-pelicula-texto"><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date}</p>
                                        <p className="detalle-pelicula-texto"><strong>Duración:</strong> {this.state.pelicula.runtime}</p>
                                        <p className="detalle-pelicula-texto"><strong>Puntuación:</strong> {this.state.pelicula.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        ) 
                        : null
                }
            </div>
        )
    }
}

export default UnaPelicula