import React, { Component } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";

class SeccionPronto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
            busqueda: ""
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=e25593014aaf22d2e4b4abad5da519dd")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    datos: data
                })
            )
            .catch(error => console.log(error));
    }

    controlarInput = (evento) => {
        this.setState({
            busqueda: evento.target.value
        });
    };

    render() {
        if (this.state.datos === "") {
            return <p>cargando...</p>;
        }

        let peliculasFiltradas = this.state.datos.results.filter((pelicula) => {
            let filtro = this.state.busqueda.toLowerCase();
            if (filtro === "") {
                return true;
            }

            return (
                pelicula.title.toLowerCase().match(filtro)
            );
        });

        return (
            <>
                <form className="Filtrado">
                    <input
                        type="text"
                        placeholder="Buscar película..."
                        value={this.state.busqueda}
                        onChange={this.controlarInput}
                    />
                </form>
                <hr></hr>
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
                        <p>No se encontraron películas.</p>
                    )}
                </section>
            </>
        );
    }
}

export default SeccionPronto