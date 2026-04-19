import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"
import FormBusqueda from "../../components/FormBusqueda/FormBusqueda"
import SeccionHome from "../../components/SeccionHome/SeccionHome"
import Header from "../../components/Header/Header";

function Home() {
    return (
        <>
            <Header />
            <main>
                <FormBusqueda />
                <h2 className="subtituloHome">Top Rated</h2>
                <SeccionHome tipo="top_rated" path="/TopRated" />
                <h2 className="subtituloHome">Más populares hoy</h2>
                <SeccionHome tipo="popular" path="/Populares" />
                <h2 className="subtituloHome">Pronto en ARN Max</h2>
                <SeccionHome tipo="upcoming" path="/Pronto" />
                <article className = "botones"> 

     <Link to="/VerTodas" className='botonVerTodasLasPelis'>
                            Ver Todas Las Peliculas / Series
                            </Link>
</article>
            </main>
        </>
    )
}

export default Home