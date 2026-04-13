import React, { Component } from "react";
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
                {this.state.datos === "" ? <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" /> :
                    <>
                        <section className="seccionTarjetas">
                            {this.state.datos.results.filter((pelis, idx) => 8 > idx).map((pelis, idx) => (
                                <TarjetaPopulares key={idx} img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`} name={pelis.title} desc={pelis.overview} id={pelis.id} />
                            ))}
                        </section>

                        <article className= "botones">

                            

                        <Link to="/Pronto" className="botonVerTodas">Ver estrenos</Link>

                        

                        <Link to="/VerTodas" className='botonVerTodasLasPelis'>
                            Ver Todas Las Peliculas
                        </Link>
                        
                        </article>
                    </>
                }

            </>
        )
    }
}

export default SeccionPronto