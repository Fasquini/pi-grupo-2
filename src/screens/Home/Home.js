import React from "react"

import FormBusqueda from "../../components/FormBusqueda/FormBusqueda"
import SeccionHome from "../../components/SeccionHome/SeccionHome"

function Home() {
    return (
        <>
            <main>
                <FormBusqueda />
                <h2 className="subtituloHome">Top Rated</h2>
                <SeccionHome tipo="top_rated" path="/TopRated" />
                <h2 className="subtituloHome">Más populares hoy</h2>
                <SeccionHome tipo="popular" path="/Populares" />
                <h2 className="subtituloHome">Pronto en ARN Max</h2>
                <SeccionHome tipo="upcoming" path="/Pronto" />
            </main>
        </>
    )
}

export default Home