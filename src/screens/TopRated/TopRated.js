import React, { useState, useEffect } from "react";
import TarjetaPeliculas from "../../components/TarjetaPelicula/TarjetaPelicula";
import Header from "../../components/Header/Header";

function TopRated(props) {
    const [datos, setDatos] = useState("")
    const [pagina, setPagina] = useState(1)
    const [valor, setValor] = useState("")

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e25593014aaf22d2e4b4abad5da519dd&page=1")
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.log(error))
    })

    function evitarSubmit(event) {
        event.preventDefault()
    }

    function controlarCambios(event) {
        setValor(event.target.value)
    }

    function filtrarPelis(textoAFiltrar) {
        let filtrados = datos.results.filter((pelis) => pelis.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
        return filtrados
    }

    function cargarMas() {
        let numeroPagina = pagina + 1;

        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e25593014aaf22d2e4b4abad5da519dd&page=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {
                setDatos(datos.results.concat(data.results))
                setPagina(numeroPagina)
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            {datos === "" ? (
                <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
            ) : (
                <>
                    <Header />
                    <form onSubmit={evitarSubmit}>
                        <input type="text" className="inputBuscar Filtro" placeholder="Buscar..." onChange={controlarCambios} value={valor} />
                    </form>

                    <h2 className="subtituloHome">Top Rated</h2>

                    <section className="seccionTarjetas">
                        {(filtrarPelis(valor).length === 0) ? (<p>No se encontraron resultados</p>) :

                            (filtrarPelis(valor).map((pelis, idx) => (
                                <TarjetaPeliculas
                                    key={idx}
                                    img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                    name={pelis.title}
                                    desc={pelis.overview}
                                    id={pelis.id}
                                    tipo="movie"
                                />
                            )))}

                    </section>
                    {valor === "" ? (
                        <button className="botonVerTodas" onClick={cargarMas}>
                            Cargar más
                        </button>
                    ) : null}
                </>
            )}
        </>
    );

}

export default TopRated;