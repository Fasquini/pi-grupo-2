import React, { Component } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";

class Favoritas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculas: [],
            series: [],
            verMasId: null
        }
    }

    cargarFavoritos() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos'))

        if (!favoritos) {
            favoritos = []
        }

        if (favoritos.length === 0) {
            this.setState({
                peliculas: [],
                series: []
            })
            return
        }

        let peliculas = []
        let series = []

        favoritos.map(unFav => {
            fetch(`https://api.themoviedb.org/3/${unFav.tipo}/${unFav.id}?api_key=e25593014aaf22d2e4b4abad5da519dd`)
                .then(response => response.json())
                .then(data => {
                    data.tipo = unFav.tipo

                    unFav.tipo === "movie"
                        ? peliculas.push(data)
                        : series.push(data)

                    this.setState({
                        peliculas: peliculas,
                        series: series
                    })
                })
                .catch(error => console.log(error))
                
                return null
        })
    }

    componentDidMount() {
        this.cargarFavoritos()
    }

    borrarFavorito(id, tipo) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos'))

        if (!favoritos) {
            favoritos = []
        }

        let filtrados = favoritos.filter(unFav => !(unFav.id === id && unFav.tipo === tipo))

        localStorage.setItem('favoritos', JSON.stringify(filtrados))

        this.cargarFavoritos()
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
                {
                    JSON.parse(localStorage.getItem('favoritos')) && 
                    JSON.parse(localStorage.getItem('favoritos')).length > 0 &&
                    this.state.peliculas.length === 0 &&
                    this.state.series.length === 0 ? (
                        <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
                    ) : null
                }
                <h2 className="subtituloHome">Películas favoritas</h2>
                <section className="seccionTarjetas">
                    {this.state.peliculas.length === 0 ? (
                        <p className="FavoritasVacio">No hay películas favoritas</p>
                    ) : (
                        this.state.peliculas.map((unaPelicula) => (
                            <article key={unaPelicula.id} className='tarjetaPeli'>
                                <img className="imgTarjetas" src={`https://image.tmdb.org/t/p/w500${unaPelicula.poster_path}`} alt={unaPelicula.title} />
                                <h3>{unaPelicula.title}</h3>

                                {this.state.verMasId === unaPelicula.id ? (
                                    <div className='verMas'>
                                        <p>{unaPelicula.overview}</p>
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

                                <button className='borrarFav' onClick={() => this.borrarFavorito(unaPelicula.id, unaPelicula.tipo)}>
                                 <p>Eliminar de favoritos</p><img src="https://img.icons8.com/?size=100&id=99933&format=png&color=FFFFFF" className="basura" alt="eliminar favoritos"/>
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
                                <img className="imgTarjetas" src={`https://image.tmdb.org/t/p/w500${unaSerie.poster_path}`} alt={unaSerie.name} />
                                <h3>{unaSerie.name}</h3>

                                {this.state.verMasId === unaSerie.id ? (
                                    <div className='verMas'>
                                        <p>{unaSerie.overview}</p>
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

                                <button className='borrarFav' onClick={() => this.borrarFavorito(unaSerie.id, unaSerie.tipo)}>
                                <p>Eliminar de favoritos</p><img src="https://img.icons8.com/?size=100&id=99933&format=png&color=FFFFFF" className="basura" alt = "eliminar favoritos"/>
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