import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"
import Header from "../../components/Header/Header";

const cookies = new Cookies()

class Favoritas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculas: [],
            series: [],
            verMasId: null
        }
    }

    componentDidMount() {
        let favoritos = cookies.get('favoritos')

        if (favoritos === undefined) {
            favoritos = []
        }

        let peliculas = favoritos.filter(unFav => unFav.tipo === 'movie')
        let series = favoritos.filter(unFav => unFav.tipo === 'tv')

        this.setState({
            peliculas: peliculas,
            series: series
        })
    }

    borrarFavorito(id, tipo) {
        let favoritos = cookies.get('favoritos')

        if (favoritos === undefined) {
            favoritos = []
        }

        let filtrados = favoritos.filter(unFav => !(unFav.id === id && unFav.tipo === tipo))

        cookies.set('favoritos', filtrados, { path: '/' })

        let peliculas = filtrados.filter(unFav => unFav.tipo === 'movie')
        let series = filtrados.filter(unFav => unFav.tipo === 'tv')

        this.setState({
            peliculas: peliculas,
            series: series
        })
    }

    verMas(id) {
        this.setState({
            verMasId: this.state.verMasId === id ? null : id
        })
    }

    render() {
        return (
            <>
                <Header />
                <h2 className="subtituloHome">Películas favoritas</h2>
                <section className="seccionTarjetasFav">
                    {this.state.peliculas.length === 0 ? (
                        <p className="FavoritasVacio">No hay películas favoritas</p>
                    ) : (
                        this.state.peliculas.map((unaPelicula) => (
                            <article key={unaPelicula.id} className='tarjetaPeli'>
                                <img className="imgTarjetas" src={unaPelicula.img} alt={unaPelicula.name} />
                                <h3>{unaPelicula.name}</h3>

                                {this.state.verMasId === unaPelicula.id ? (
                                    <div className='verMas'>
                                        <p>{unaPelicula.desc}</p>
                                    </div>
                                ) : ""}

                                <button className='botonMas' onClick={() => this.verMas(unaPelicula.id)}>
                                    {this.state.verMasId === unaPelicula.id ? "Ver menos" : "Ver más"}
                                </button>

                                <ul>
                                    <li>
                                        <Link to={`/UnaPelicula/${unaPelicula.id}/${unaPelicula.tipo}`}>
                                            Ir a detalle
                                        </Link>
                                    </li>
                                </ul>

                                <button className='botonFav' onClick={() => this.borrarFavorito(unaPelicula.id, unaPelicula.tipo)}>
                                    Eliminar de favoritos
                                </button>
                            </article>
                        ))
                    )}
                </section>

                <h2 className="subtituloHome">Series favoritas</h2>
                <section className="seccionTarjetas">
                    {this.state.series.length === 0 ? (
                        <p className="FavoritasVacio">No hay series favoritas</p>
                    ) : (
                        this.state.series.map((unaSerie) => (
                            <article key={unaSerie.id} className='tarjetaPeli'>
                                <img className="imgTarjetas" src={unaSerie.img} alt={unaSerie.name} />
                                <h3>{unaSerie.name}</h3>

                                {this.state.verMasId === unaSerie.id ? (
                                    <div className='verMas'>
                                        <p>{unaSerie.desc}</p>
                                    </div>
                                ) : ""}

                                <button className='botonMas' onClick={() => this.verMas(unaSerie.id)}>
                                    {this.state.verMasId === unaSerie.id ? "Ver menos" : "Ver más"}
                                </button>

                                <ul>
                                    <li>
                                        <Link to={`/UnaPelicula/${unaSerie.id}/${unaSerie.tipo}`}>
                                            Ir a detalle
                                        </Link>
                                    </li>
                                </ul>

                                <button className='botonFav' onClick={() => this.borrarFavorito(unaSerie.id, unaSerie.tipo)}>
                                    Eliminar de favoritos
                                </button>
                            </article>
                        ))
                    )}
                </section>
            </>
        )
    }
}

export default Favoritas