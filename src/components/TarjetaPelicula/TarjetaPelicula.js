import React, { useState,  useEffect} from "react"
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies()

function TarjetaPelicula (props) {
    const [verMas, setVerMas] = useState(false)
    const [esFavorito, setesFavorito] = useState(false)
    
    useEffect(() => {
            let favoritos = JSON.parse(localStorage.getItem('favoritos'))

        if (!favoritos) {
            favoritos = []
        }

        let filtrados = favoritos.filter(fav =>
            fav.id === props.id &&
            fav.tipo === props.tipo
        )

        if (filtrados.length > 0) {
            setesFavorito(true)
        }
        })

    function FVerMas() {
        setVerMas(!verMas)
    }

    function agregarFavorito() {
        if (cookies.get("user-auth-cookie") === undefined) {
            props.history.push("/Registro")
            return
        }

        let favoritos = JSON.parse(localStorage.getItem('favoritos'))

        if (!favoritos) {
            favoritos = []
        }

        let filtrados = favoritos.filter(fav =>
            fav.id === props.id &&
            fav.tipo === props.tipo
        )

        if (filtrados.length === 0) {
            let obj = {
                id: props.id,
                tipo: props.tipo
            }

            favoritos.push(obj)
            localStorage.setItem('favoritos', JSON.stringify(favoritos))

            setesFavorito(true)
        }
        
    }

    
        return (
            <article className='tarjetaPeli'>
                <img className="imgTarjetas" src={props.img} alt={props.name} />
                <h3>{props.name}</h3>

                {verMas ? (
                    <div className='verMas'>
                        <p>{props.desc}</p>
                    </div>
                ) : ""}

                <button className='botonMas' onClick={FVerMas}>
                    {verMas ? "Ver menos" : "Ver más"}
                </button>

                <ul>
                    <li>
                        <Link to={`/UnaPelicula/${props.id}/${props.tipo}`}>
                            Ir a detalle
                        </Link>
                    </li>
                </ul>

                {cookies.get("user-auth-cookie") === undefined ? "" : (

                    esFavorito ? (
                        <Link to="/Favoritas">
                            <button className='botonFav agregado'>
                            <p>Agregado a favoritos</p>
                            <img src="https://img.icons8.com/?size=100&id=82769&format=png&color=209DAD" className="agregarFav" alt = "favoritos" />
                        </button>
                        </Link>
                    ) : (
                        <button className='botonFav' onClick={agregarFavorito}>
                            Agregar a favoritos
                        </button>
                    ))

                }
            </article>
        )
    
}

export default withRouter(TarjetaPelicula)