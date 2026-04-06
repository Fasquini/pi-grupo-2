import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tarjetaspeliculas from "../TarjetaPelicula/TarjetaPelicula";

class SeccionPopulares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: "",
        }

    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e25593014aaf22d2e4b4abad5da519dd")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    datos: data
                })
            )
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
                {this.state.datos === "" ? <p>cargando...</p> :
                    <>
                        <section className="seccionTarjetas">
                            {this.state.datos.results.filter((pelis, idx) => 8 > idx).map((pelis, idx) => (
                                <Tarjetaspeliculas key={idx} img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`} name={pelis.title} desc={pelis.overview} id={pelis.id} />
                            ))}
                        </section>

                        <Link to="/Populares" className='botonVerTodas'>
                            Ver populares
                        </Link>

                       

                    </>
                }

            </>
        )
    }
}

export default SeccionPopulares