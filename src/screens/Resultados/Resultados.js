import React, { Component } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";
import FormBusqueda from "../../components/FormBusqueda/FormBusqueda";

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
            busqueda: props.match.params.busqueda
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/search/movie?api_key=e25593014aaf22d2e4b4abad5da519dd&query=" + this.props.match.params.busqueda)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    datos: data,
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
    return (
        this.state.datos === "" ? (
            <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
        ) : (
            <>
                <FormBusqueda />
                <h2 className="subtituloHome">
                    Resultados para: "{this.props.match.params.busqueda}"
                </h2>
                <section className="seccionTarjetas">
                    {this.state.datos.results.length === 0 ? (
                        <p>No se encontraron resultados.</p>
                    ) : (
                        this.state.datos.results.map((pelis, idx) => (
                            <TarjetaPelicula
                                key={idx}
                                img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                name={pelis.title}
                                desc={pelis.overview}
                                id={pelis.id}
                            />
                        ))
                    )}
                </section>
            </>
        )
    );
}
}

export default Resultados;

