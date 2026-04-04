import React, { Component } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";

class SeccionPronto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
            busqueda: "",
            pagina: 1,
            valor: ""
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

    evitarSubmit(event) {
        event.preventDefault()
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value })
    }

    filtrarPelis(textoAFiltrar) {
        let filtrados = this.state.datos.results.filter((pelis) => pelis.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
        return filtrados
    }

    cargarMas() {
        let numeroPagina = this.state.pagina + 1

        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=e25593014aaf22d2e4b4abad5da519dd&page=${numeroPagina}`)
            .then(response => response.json())
            .then(data => {

                this.setState({
                    datos: {
                        results: this.state.datos.results.concat(data.results),
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
                        <form onSubmit={(event) => this.evitarSubmit(event)}>
                            <input type="text" className="inputBuscar Filtro" placeholder="Buscar..." onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        </form>

                        <h2 className="subtituloHome">Pronto</h2>

                        <section className="seccionTarjetas">
                            {(this.filtrarPelis(this.state.valor).length === 0) ? (<p>no se encontraron resultados</p>) :

                                (this.filtrarPelis(this.state.valor).map((pelis, idx) => (
                                    <TarjetaPelicula
                                        key={idx}
                                        img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                        name={pelis.title}
                                        desc={pelis.overview}
                                        id={pelis.id}
                                    />
                                )))}
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

export default SeccionPronto