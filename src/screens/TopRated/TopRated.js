import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TarjetaPopulares from "../../components/TarjetaPelicula/TarjetaPelicula";

class SeccionTopRated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
            busqueda: "",
            pagina: 1
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e25593014aaf22d2e4b4abad5da519dd&page=1")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    datos: data,
                    pagina: 1
                })
            )
            .catch(error => console.log(error));
    }

    controlarInput = (evento) => {
        this.setState({
            busqueda: evento.target.value
        });
    };

    cargarMas = () => {
        let numeroPagina = this.state.pagina + 1;

        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e25593014aaf22d2e4b4abad5da519dd&page=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {
                let nuevosResultados = this.state.datos.results.concat(data.results);

                this.setState({
                    datos: {
                        page: this.state.datos.page,
                        results: nuevosResultados,
                        total_pages: this.state.datos.total_pages,
                        total_results: this.state.datos.total_results
                    },
    pagina: numeroPagina
});
            })
            .catch(error => console.log(error));
    };

    evitarSubmit(event) {
        event.preventDefault();
        this.props.history.push("/Resultados?busqueda=" + this.state.busqueda);
    }

    render() {
        if (this.state.datos === "") {
            return <p>cargando...</p>;
        }

        let peliculasFiltradas = this.state.datos.results;

        return (
            <>
                <form className="formBuscar" onSubmit={(event) => this.evitarSubmit(event)}>
                    <input
                        className="inputBuscar"
                        type="text"
                        placeholder="Buscar..."
                        value={this.state.busqueda}
                        onChange={this.controlarInput}
                    />

                    <button className="botonBuscar" type="submit">
                        Buscar
                    </button>
                </form>
                <h2 className="subtituloHome">Top Rated</h2>

                <section className="seccionTarjetas">
                    {peliculasFiltradas.length > 0 ? (
                        peliculasFiltradas.map((pelis, idx) => (
                            <TarjetaPopulares
                                key={idx}
                                img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                name={pelis.title}
                                desc={pelis.overview}
                                id={pelis.id}
                            />
                        ))
                    ) : (
                        <p>No se encontraron películas.</p>
                    )}
                </section>
                <button className="botonVerTodas" onClick={this.cargarMas}>
                    Cargar más
                </button>
            </>
        );
    }
}

export default withRouter(SeccionTopRated);