import React, { Component } from "react";
import { Link } from "react-router-dom";
import TarjetaPeliculas from "../TarjetaPelicula/TarjetaPelicula";

class TopRated extends Component {
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
                {this.state.datos === "" ? <img className="loader" src="https://i.gifer.com/ZZ5H.gif" alt="loader" /> :
                    <>
                        <section className="seccionTarjetas">
                            {this.state.datos.results.filter((pelis, idx) => 8 > idx).map((pelis, idx) => (
                                <TarjetaPeliculas key={idx} img={`https://image.tmdb.org/t/p/w500${pelis.poster_path}`} name={pelis.title} desc={pelis.overview} id={pelis.id} />
                            ))}
                        </section>

                        <Link to="/TopRated" className='botonVerTodas'>
                            Top Rated
                        </Link>

                       

                    </>
                }

            </>
        )
    }
}

export default TopRated