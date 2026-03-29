import React from "react"

import FormBusqueda from "../../components/FormBusqueda/FormBusqueda"
import SeccionPronto from "../../components/SeccionPronto/SeccionPronto"
import SeccionPopulares from "../../components/SeccionPopulares/SeccionPopulares"
import SeccionTopRated from "../../components/SeccionTopRated/SeccionTopRated"

function Home(){
    return(
        <>
            <main>
                <FormBusqueda/>
                <h2 className="subtituloHome">Top Rated</h2>
                <SeccionTopRated/>
                <h2 className="subtituloHome">Más populares hoy</h2>
                <SeccionPopulares/>
                <h2 className="subtituloHome">Pronto en ARN Max</h2>
                <SeccionPronto/>
            </main>
        </>
    )
}

export default Home