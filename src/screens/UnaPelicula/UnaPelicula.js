import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";
const cookies = new Cookies()

class UnaPelicula extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pelicula: "",
            esFavorito: false
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        let tipo = this.props.match.params.tipo

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=81dded2ba544d830e45caeb888ae898e&`)
            .then(response => response.json())
            .then(data => {

                let favoritos = cookies.get('favoritos')

                if (favoritos === undefined) {
                    favoritos = []
                }

                let filtrados = favoritos.filter(fav => fav.id === data.id && fav.tipo === tipo)

                this.setState({
                    pelicula: data,
                    esFavorito: filtrados.length > 0
                })
            })
            .catch(error => console.log(error))
    }

    agregarFavorito() {
        let sesion = cookies.get('user-auth-cookie')

        if (sesion === undefined) {
            this.props.history.push("/Registro")
            return
        }

        let favoritos = cookies.get('favoritos')

        if (favoritos === undefined) {
            favoritos = []
        }

        let filtrados = favoritos.filter(fav => fav.id === this.state.pelicula.id && fav.tipo === this.props.match.params.tipo)

        if (filtrados.length === 0) {
            let obj = {
                id: this.state.pelicula.id,
                name: this.state.pelicula.title !== undefined ? this.state.pelicula.title : this.state.pelicula.name,
                img: `https://image.tmdb.org/t/p/w500${this.state.pelicula.poster_path}`,
                desc: this.state.pelicula.overview,
                tipo: this.props.match.params.tipo
            }

            favoritos.push(obj)
            cookies.set('favoritos', favoritos, { path: '/' })

            this.setState({ esFavorito: true })
        }
    }

    render() {
        return (
            <div className="detalle-pelicula-container">
                <Header />
                {
                    this.state.pelicula === ""
                        ? <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
                        : null
                }

                {
                    this.state.pelicula !== ""
                        ? (
                            <div>

                                <h2 className="detalle-pelicula-titulo">{this.state.pelicula.title !== undefined
                                    ? this.state.pelicula.title
                                    : this.state.pelicula.name}</h2>

                                <div className="detalle-pelicula-card">
                                    <img
                                        className="detalle-pelicula-img"
                                        src={`https://image.tmdb.org/t/p/w500${this.state.pelicula.poster_path !== undefined
                                            ? this.state.pelicula.poster_path
                                            : this.state.pelicula.backdrop_path}`}
                                        alt={this.state.pelicula.title || this.state.pelicula.name}
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

                                        <p className="detalle-pelicula-texto"><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date !== undefined ? this.state.pelicula.release_date : this.state.pelicula.first_air_date}</p>

                                        {this.props.match.params.tipo === "movie" ? (
                                            <p className="detalle-pelicula-texto"><strong>Duración:</strong> {this.state.pelicula.runtime} min</p>
                                        ) : ""}

                                        <p className="detalle-pelicula-texto">
                                            <strong>{
                                                this.state.pelicula.genres && this.state.pelicula.genres.length === 1
                                                    ? "Género:"
                                                    : "Géneros:"
                                            }</strong> {
                                                this.state.pelicula.genres && this.state.pelicula.genres.length > 0
                                                    ? this.state.pelicula.genres.map((gen, idx) => (
                                                        <span key={idx}>
                                                            {gen.name}{idx < this.state.pelicula.genres.length - 1 ? ", " : ""}
                                                        </span>
                                                    ))
                                                    : "Sin datos"
                                            }
                                        </p>

                                        {cookies.get("user-auth-cookie") === undefined ? "" : (
                                        <ul className="favoritoDetalle">
                                            <li>
                                                <button
                                                    className={this.state.esFavorito ? "botonFavCorazon" : "botonFav"}
                                                    onClick={() => {
                                                        if (this.state.esFavorito) {
                                                            this.props.history.push("/Favoritas")
                                                        } else {
                                                            this.agregarFavorito()
                                                        }
                                                    }}
                                                >
                                                    {this.state.esFavorito ? "❤️" : "Agregar a favoritos"}
                                                </button>
                                            </li>
                                        </ul>
                                        )}
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

export default withRouter(UnaPelicula)