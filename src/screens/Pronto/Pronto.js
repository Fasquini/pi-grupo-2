import React, { useEffect, useState } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";
import Header from "../../components/Header/Header";

function SeccionPronto(props) {
    const [datos, setDatos] = useState("")
    const [busqueda, setBusqueda] = useState("")
    const [pagina, setPagina] = useState(1)
    const [valor, setValor] = useState("")

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=e25593014aaf22d2e4b4abad5da519dd")
            .then(response => response.json())
            .then(data =>
                setDatos(data)
            )
            .catch(error => console.log(error));
    }, [])

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
        let numeroPagina = pagina + 1

        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=e25593014aaf22d2e4b4abad5da519dd&page=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {

                setDatos({
                    results: datos.results.concat(data.results),
                })
                setPagina(numeroPagina)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {datos === "" ? (
                <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
            ) : (
                <>
                    <Header />
                    <form onSubmit={(event) => evitarSubmit(event)}>
                        <input type="text" className="inputBuscar Filtro" placeholder="Buscar..." onChange={(event) => controlarCambios(event)} value={valor} />
                    </form>

                    <h2 className="subtituloHome">Pronto</h2>

                    <section className="seccionTarjetas">
                        {(filtrarPelis(valor).length === 0) ? (<p>No se encontraron resultados para: "{valor}"</p>) :

                            (filtrarPelis(valor).map((pelis, idx) => (
                                <TarjetaPelicula
                                    key={idx}
                                    img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                    name={pelis.title}
                                    desc={pelis.overview}
                                    id={pelis.id}
                                    tipo = "movie"
                                />
                            )))}
                    </section>
                    {valor === "" ? (
                        <button className="botonVerTodas" onClick={() => cargarMas()}>
                            Cargar más
                        </button>
                    ) : null}

                </>
            )}
        </>
    );
}

export default SeccionPronto