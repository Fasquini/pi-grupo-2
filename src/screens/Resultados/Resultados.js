import React, { useState, useEffect } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";
import Header from "../../components/Header/Header";

function Resultados(props) {
    const [datos, setDatos] = useState(""); 
    const [busqueda] = useState(props.match.params.busqueda);
    const [tipo] = useState(props.match.params.tipo);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/search/${tipo}?api_key=e25593014aaf22d2e4b4abad5da519dd&query=${busqueda}`
        )
            .then((response) => response.json())
            .then((data) => setDatos(data.results))
            .catch((error) => console.log(error));
    }, [busqueda, tipo]); 

    return datos === "" ? ( 
        <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
    ) : (
        <>
            <Header />
            <h2 className="subtituloHome">
                Resultados para: "{busqueda}"
            </h2>
            <section className="seccionTarjetas">
                {datos.length === 0 ? (
                    <p>No se encontraron resultados.</p>
                ) : (
                    datos.map((pelis, idx) => (
                        <TarjetaPelicula
                            key={idx}
                            img={`https://image.tmdb.org/t/p/w500${pelis.poster_path || pelis.backdrop_path}`}
                            name={pelis.title || pelis.name}
                            desc={pelis.overview}
                            id={pelis.id}
                            tipo={tipo === "tv" ? "tv" : "movie"}
                        />
                    ))
                )}
            </section>
        </>
    );
}

export default Resultados;