import React, { Component } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";
import FormBusqueda from "../../components/FormBusqueda/FormBusqueda";

class SeccionPopulares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
            busqueda: "",
            pagina: 1
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e25593014aaf22d2e4b4abad5da519dd")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    datos: data
                })
            )
            .catch(error => console.log(error));
    }

    controlarInput = (e) => {
        this.setState({
            busqueda: e.target.value
        });
    };

    cargarMas(){
        let numeroPagina = this.state.pagina + 1

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e25593014aaf22d2e4b4abad5da519dd&page=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {
                let nuevasPeliculas = this.state.datos.results

                for(let i = 0; i < data.results.length; i++){
                    nuevasPeliculas.push(data.results[i])
                }

                this.setState({
                    datos: {
                        page: this.state.datos.page,
                        results: nuevasPeliculas,
                        total_pages: this.state.datos.total_pages,
                        total_results: this.state.datos.total_results
                    },
                    pagina: numeroPagina
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
                {this.state.datos === "" ? (
                    <p>cargando...</p>
                ) : (
                    <>
                        <FormBusqueda />

                        <h2 className="subtituloHome">Populares</h2>

                        <section className="seccionTarjetas">
                            {this.state.datos.results.map((pelis, idx) => (
                                <TarjetaPelicula
                                    key={idx}
                                    img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                    name={pelis.title}
                                    desc={pelis.overview}
                                    id={pelis.id}
                                />
                            ))}
                        </section>
                        <button className="botonVerTodas" onClick={() => this.cargarMas()}>
                            Cargar más
                        </button>
                    </>
                )}
            </>
        );
    }
}

export default SeccionPopulares;