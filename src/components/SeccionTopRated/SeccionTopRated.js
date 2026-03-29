import React, { Component } from "react";
import { Link } from "react-router-dom";
import TarjetaPopulares from "../TarjetaPelicula/TarjetaPelicula";

class SeccionTopRated extends Component {
    constructor(props) {
        super();
        this.state = {
            datos: "",
        }

    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e25593014aaf22d2e4b4abad5da519dd")
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
                            {this.state.datos.results.slice(0, 8).map((pelis, idx) => (
                                <TarjetaPopulares key={idx} img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`} name={pelis.title} desc={pelis.overview} id={pelis.id}/>
                            ))}
                        </section>

                        <button className="botonVerTodas">
                        <Link to="/Populares">Ver todas</Link> 
                        </button>

                    </>
                }

            </>
        )
    }
}

export default SeccionTopRated