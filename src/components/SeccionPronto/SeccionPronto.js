import React, {Component } from "react";
import TarjetaPopulares from "../TarjetaPelicula/TarjetaPelicula";
import { Link } from "react-router-dom";

class SeccionPronto extends Component {
           constructor(props) {
        super();
        this.state = {
            datos: "",
        }

    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=d02a8eac61575af8b13cc0b8b27a069e")
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
                        <Link to="/Pronto">Ver todas</Link> 
                        </button>

                    </>
                }

            </>
        )
    }
}

export default SeccionPronto