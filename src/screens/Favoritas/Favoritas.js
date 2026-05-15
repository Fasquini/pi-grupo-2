import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";

function Favoritas(props) {
    const [peliculas, setPeliculas] = useState([])
    const [series, setSeries] = useState([])
    const [verMasId, setVerMasId] = useState(null)

    useEffect(() => {
        let favoritos = JSON.parse(localStorage.getItem('favoritos'))

        if (!favoritos) {
            favoritos = []
        }

        if (favoritos.length === 0) {
            setPeliculas([])
            setSeries([])
            return
        }

        let peliculasFavoritas = []
        let seriesFavoritas = []

        favoritos.map(unFav => {
            fetch(`https://api.themoviedb.org/3/${unFav.tipo}/${unFav.id}?api_key=e25593014aaf22d2e4b4abad5da519dd`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        data.tipo = unFav.tipo

                        if (unFav.tipo === "movie") {
                            peliculasFavoritas.push(data)
                        } else {
                            seriesFavoritas.push(data)
                        }

                        setPeliculas(peliculasFavoritas)
                        setSeries(seriesFavoritas)
                    }
                })
                .catch(error => console.log(error))
        })
    }, [])

    function borrarFavorito(id, tipo) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos'))

        if (!favoritos) {
            favoritos = []
        }

        let filtrados = favoritos.filter(unFav => !(unFav.id === id && unFav.tipo === tipo))

        localStorage.setItem('favoritos', JSON.stringify(filtrados))

        setPeliculas(peliculas.filter(pelis => !(pelis.id === id && pelis.tipo === tipo)))
        setSeries(series.filter(series => !(series.id === id && series.tipo === tipo)))
    }

    function verMas(id) {
        setVerMasId(verMasId === id ? null : id)
    }

    return (
        <>
            <Header />
            {
                JSON.parse(localStorage.getItem('favoritos')) && 
                JSON.parse(localStorage.getItem('favoritos')).length > 0 &&
                peliculas.length === 0 &&
                series.length === 0 ? (
                    <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
                ) : null
            }
            <h2 className="subtituloHome">Películas favoritas</h2>
            <section className="seccionTarjetas">
                {peliculas.length === 0 ? (
                    <p className="FavoritasVacio">No hay películas favoritas</p>
                ) : (
                    peliculas.map((unaPelicula) => (
                        <article key={unaPelicula.id} className='tarjetaPeli'>
                            <img className="imgTarjetas" src={unaPelicula.poster_path ? `https://image.tmdb.org/t/p/w500${unaPelicula.poster_path}` : "https://placehold.co/500x750?text=Sin+imagen"} alt={unaPelicula.title} />
                            <h3>{unaPelicula.title}</h3>

                            {verMasId === unaPelicula.id ? (
                                <div className='verMas'>
                                    <p>{unaPelicula.overview}</p>
                                </div>
                            ) : null}

                            <button className='botonMas' onClick={() => verMas(unaPelicula.id)}>
                                {verMasId === unaPelicula.id ? "Ver menos" : "Ver más"}
                            </button>

                            <ul>
                                <li>
                                    <Link to={`/UnaPelicula/${unaPelicula.id}/${unaPelicula.tipo}`}>
                                        Ir a detalle
                                    </Link>
                                </li>
                            </ul>

                            <button className='borrarFav' onClick={() => borrarFavorito(unaPelicula.id, unaPelicula.tipo)}>
                             <p>Eliminar de favoritos</p><img src="https://img.icons8.com/?size=100&id=99933&format=png&color=FFFFFF" className="basura" alt="eliminar favoritos"/>
                            </button>
                        </article>
                    ))
                )}
            </section>

            <h2 className="subtituloHome">Series favoritas</h2>
            <section className="seccionTarjetas">
                {series.length === 0 ? (
                    <p className="FavoritasVacio">No hay series favoritas</p>
                ) : (
                    series.map((unaSerie) => (
                        <article key={unaSerie.id} className='tarjetaPeli'>
                            <img className="imgTarjetas" src={unaSerie.poster_path ? `https://image.tmdb.org/t/p/w500${unaSerie.poster_path}` : "https://placehold.co/500x750?text=Sin+imagen"} alt={unaSerie.name} />
                            <h3>{unaSerie.name}</h3>

                            {verMasId === unaSerie.id ? (
                                <div className='verMas'>
                                    <p>{unaSerie.overview}</p>
                                </div>
                            ) : null}

                            <button className='botonMas' onClick={() => verMas(unaSerie.id)}>
                                {verMasId === unaSerie.id ? "Ver menos" : "Ver más"}
                            </button>

                            <ul>
                                <li>
                                    <Link to={`/UnaPelicula/${unaSerie.id}/${unaSerie.tipo}`}>
                                        Ir a detalle
                                    </Link>
                                </li>
                            </ul>

                            <button className='borrarFav' onClick={() => borrarFavorito(unaSerie.id, unaSerie.tipo)}>
                            <p>Eliminar de favoritos</p><img src="https://img.icons8.com/?size=100&id=99933&format=png&color=FFFFFF" className="basura" alt = "eliminar favoritos"/>
                            </button>
                        </article>
                    ))
                )}
            </section>
        </>
    )
}

export default Favoritas