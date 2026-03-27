import React from "react"

import FormBusqueda from "../../components/FormBusqueda/FormBusqueda"
import SeccionEnCartel from "../../components/SeccionEnCartel/SeccionEnCartel"
import SeccionPopulares from "../../components/SeccionPopulares/SeccionPopulares"

function Home(){
    return(
        <>
            <main>
                <FormBusqueda/>
                <h2 className="subtituloHome">Peliculas mas populares</h2>
                <SeccionPopulares/>
                <h2 className="subtituloHome">Peliculas en cartelera</h2>
                <SeccionEnCartel/>
            </main>
        </>
    )
}

export default Home