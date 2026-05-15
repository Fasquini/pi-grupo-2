import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

function UnaPelicula(props) {
    const [pelicula, setPelicula] = useState(null);
    const [esFavorito, setFavorito] = useState(false);
    const tipo = props.match.params.tipo;
    const id = props.match.params.id;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=81dded2ba544d830e45caeb888ae898e`)
            .then(response => response.json())
            .then(data => {
                let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                let filtrados = favoritos.filter(fav => fav.id === data.id && fav.tipo === tipo);
                setFavorito(filtrados.length > 0);
                setPelicula(data);
            })
            .catch(error => console.log(error));
    }, []);

    function agregarFavorito() {
        let sesion = cookies.get('user-auth-cookie');

        if (sesion === undefined) {
            props.history.push("/Registro");
            return;
        }

        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        let filtrados = favoritos.filter(fav => fav.id === pelicula.id && fav.tipo === tipo);

        if (filtrados.length === 0) {
            favoritos.push({ id: pelicula.id, tipo });
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            setFavorito(true);
        }
    }

    return (
        <div className="detalle-pelicula-container">
            <Header />

            {pelicula === null && (
                <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
            )}

            {pelicula !== null && (
                <div>
                    <h2 className="detalle-pelicula-titulo">
                        {pelicula.title || pelicula.name}
                    </h2>

                    <div className="detalle-pelicula-card">
                        <img
                            className="detalle-pelicula-img"
                            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path || pelicula.backdrop_path}`}
                            alt={pelicula.title || pelicula.name}
                        />

                        <div className="detalle-pelicula-info">
                            <h3 className="detalle-pelicula-subtitulo">Descripción</h3>

                            <p className="detalle-pelicula-descripcion">
                                {pelicula.overview || "Sin sinopsis disponible"}
                            </p>

                            <p className="detalle-pelicula-texto">
                                <strong>Fecha de estreno:</strong>{" "}
                                {pelicula.release_date || pelicula.first_air_date}
                            </p>

                            {tipo === "movie" && (
                                <p className="detalle-pelicula-texto">
                                    <strong>Duración:</strong> {pelicula.runtime} min
                                </p>
                            )}

                            <p className="detalle-pelicula-texto">
                                <strong>
                                    {pelicula.genres?.length === 1 ? "Género:" : "Géneros:"}
                                </strong>{" "}
                                {pelicula.genres?.length > 0
                                    ? pelicula.genres.map((gen, idx) => (
                                        <span key={idx}>
                                            {gen.name}{idx < pelicula.genres.length - 1 ? ", " : ""}
                                        </span>
                                    ))
                                    : "Sin datos"}
                            </p>

                            {cookies.get("user-auth-cookie") !== undefined && (
                                <ul className="favoritoDetalle">
                                    <li>
                                        <button
                                            className={esFavorito ? "botonFav agregado" : "botonFav"}
                                            onClick={() => {
                                                if (esFavorito) {
                                                    props.history.push("/Favoritas");
                                                } else {
                                                    agregarFavorito();
                                                }
                                            }}
                                        >
                                            {esFavorito
                                                ? <>
                                                    <p>Agregado a favoritos</p>
                                                    <img src="https://img.icons8.com/?size=100&id=82769&format=png&color=209DAD" className="agregarFav" alt="favoritos" />
                                                  </>
                                                : "Agregar a favoritos"
                                            }
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(UnaPelicula);