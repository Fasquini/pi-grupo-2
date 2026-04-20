import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies()

class TarjetaPelicula extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            esFavorito: false
        }
    }

    componentDidMount() {
        let favoritos = cookies.get('favoritos')

        if (favoritos === undefined) {
            favoritos = []
        }

        let filtrados = favoritos.filter(fav =>
            fav.id === this.props.id &&
            fav.tipo === this.props.tipo
        )

        if (filtrados.length > 0) {
            this.setState({ esFavorito: true })
        }
    }

    VerMas() {
        this.setState({
            verMas: !this.state.verMas
        })
    }

    agregarFavorito() {
        if (cookies.get("user-auth-cookie") === undefined) {
            this.props.history.push("/Registro")
            return
        }

        let favoritos = cookies.get('favoritos')

        if (favoritos === undefined) {
            favoritos = []
        }

        let filtrados = favoritos.filter(fav =>
            fav.id === this.props.id &&
            fav.tipo === this.props.tipo
        )

        if (filtrados.length === 0) {
            let obj = {
                id: this.props.id,
                name: this.props.name,
                img: this.props.img,
                desc: this.props.desc,
                tipo: this.props.tipo
            }

            favoritos.push(obj)
            cookies.set('favoritos', favoritos, { path: '/' })

            this.setState({ esFavorito: true })
        }
        
    }

    render() {
        return (
            <article className='tarjetaPeli'>
                <img className="imgTarjetas" src={this.props.img} alt={this.props.name} />
                <h3>{this.props.name}</h3>

                {this.state.verMas ? (
                    <div className='verMas'>
                        <p>{this.props.desc}</p>
                    </div>
                ) : ""}

                <button className='botonMas' onClick={() => this.VerMas()}>
                    {this.state.verMas ? "Ver menos" : "Ver más"}
                </button>

                <ul>
                    <li>
                        <Link to={`/UnaPelicula/${this.props.id}/${this.props.tipo}`}>
                            Ir a detalle
                        </Link>
                    </li>
                </ul>

                {cookies.get("user-auth-cookie") === undefined ? "" : (

                    this.state.esFavorito ? (
                        <Link to="/Favoritas">
                            <button className='botonFav agregado'>
                            <p>Agregado a favoritos</p>
                            <img src="https://img.icons8.com/?size=100&id=82769&format=png&color=209DAD" className="agregarFav" />
                        </button>
                        </Link>
                    ) : (
                        <button className='botonFav' onClick={() => this.agregarFavorito()}>
                            Agregar a favoritos
                        </button>
                    ))

                }
            </article>
        )
    }
}

export default withRouter(TarjetaPelicula)