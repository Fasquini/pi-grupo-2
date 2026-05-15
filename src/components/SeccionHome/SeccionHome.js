import React, { useState,  useEffect} from "react";
import { Link } from "react-router-dom";
import TarjetaPeliculas from "../TarjetaPelicula/TarjetaPelicula";

function SeccionHome(props) {
    const [datos, setDatos] = useState("")

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/" + props.tipo + "?api_key=e25593014aaf22d2e4b4abad5da519dd")
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.log(error))
    })


    return (
        <>
            {datos === "" ? <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" /> :
                <>
                    <section className="seccionTarjetas">
                        {datos.results.filter((pelis, idx) => 8 > idx).map((pelis, idx) => (
                            <TarjetaPeliculas key={idx} tipo="movie" img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`} name={pelis.title} desc={pelis.overview} id={pelis.id} />
                        ))}
                    </section>

                    <Link to={props.path} className='botonVerTodas'>
                        {props.tipo === "top_rated" ? "Top Rated" : ""}
                        {props.tipo === "popular" ? "Ver Populares" : ""}
                        {props.tipo === "upcoming" ? "Ver estrenos" : ""}
                    </Link>

                </>
            }

        </>
    )

}

export default SeccionHome