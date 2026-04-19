import React, { Component } from "react";
import TarjetaPelicula from "../../components/TarjetaPelicula/TarjetaPelicula";
import Header from "../../components/Header/Header";

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: [],
            pagina: 1,
            valor: ""
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

    evitarSubmit(event) {
        event.preventDefault()
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value })
    }

    filtrarPelis(textoAFiltrar) {
        let filtrados = this.state.resultados.filter((pelis) => pelis.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
        return filtrados
    }

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

        return (
            this.state.resultados === "" ? (
                <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
            ) : (
                <>
                    <Header />
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        <input type="text" className="inputBuscar Filtro" placeholder="Buscar..." onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                    </form>

                    <h2 className="subtituloHome">Ver Todas</h2>


                    <section className="seccionTarjetas">
                        {(this.filtrarPelis(this.state.valor).length === 0) ? (<p>No se encontraron resultados</p>) :

                            (this.filtrarPelis(this.state.valor).map((pelis, idx) => (
                                <TarjetaPelicula
                                    key={idx}
                                    img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`}
                                    name={pelis.title}
                                    desc={pelis.overview}
                                    id={pelis.id}
                                    tipo={pelis.tipo}
                                />
                            )))}

                    </section>
                    {this.state.valor === "" ? (
                        <button className="botonVerTodas" onClick={() => this.cargarMas()}>
                            Cargar más
                        </button>
                    ) : null}
                </>
            )
        );
    }
}

export default Peliculas;