import React, { Component } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";
import FormBusqueda from "../../components/FormBusqueda/FormBusqueda";

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],
            pagina: 1
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=81dded2ba544d830e45caeb888ae898e&language=es-ES&page=1`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    resultados: data.results,
                    pagina: 1
                });
            })
            .catch(error => console.log(error));
    }

    controlarInput = (evento) => {
        this.setState({
            busqueda: evento.target.value
        });
    };

    cargarMas() {
        let numeroPagina = this.state.pagina + 1;

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=81dded2ba544d830e45caeb888ae898e&language=es-ES&page=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {
                let nuevosResultados = this.state.resultados.concat(data.results);

                this.setState({
                    resultados: nuevosResultados,
                    pagina: numeroPagina
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        let peliculasFiltradas = this.state.resultados;

        return (
        this.state.resultados === "" ? (
            <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
    ) : (
            <>
                <FormBusqueda />

                <h2 className="subtituloHome">Ver Todas</h2>


                <section className="seccionTarjetas">
                    {peliculasFiltradas.length > 0 ? (
                        peliculasFiltradas.map((pelis, idx) => (
                            <TarjetaPelicula
                                key={idx}
                                img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                name={pelis.title}
                                desc={pelis.overview}
                                id={pelis.id}
                            />
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </section>

                <button className="botonVerTodas" onClick={() => this.cargarMas()}>
                    Cargar más
                </button>
            </>
    )
        );
    }
}

export default Peliculas;