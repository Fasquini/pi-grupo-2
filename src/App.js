import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./screens/Home/Home";
import UnaPelicula from "./screens/UnaPelicula/UnaPelicula";
import VerTodas from "./screens/VerTodas/VerTodas";
import Favoritas from "./screens/Favoritas/Favoritas";
import Registro from "./screens/Registro/Registro";
import Login from "./screens/Login/Login";
import NotFound from "./screens/NotFound/NotFound";
import Resultados from "./screens/Resultados/Resultados";
import TopRated from "./screens/TopRated/TopRated";
import SeccionPopulares from "./screens/Populares/Populares";
import SeccionPronto from "./screens/Pronto/Pronto";

function App() {
  return (
    <>
      <div id="divContenedor">

        

        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/UnaPelicula/:id/:tipo" component={UnaPelicula} />
          <Route path="/Resultados/:tipo/:busqueda" component={Resultados} />
          <Route path="/VerTodas" component={VerTodas} />
          <Route path="/TopRated" component={TopRated} />
          <Route path="/Populares" component={SeccionPopulares} />
          <Route path="/Pronto" component={SeccionPronto} />
          <Route path="/Favoritas" component={Favoritas} />
          <Route path="/Registro" component={Registro} />
          <Route path="/Login" component={Login} />
          <Route path="" component={NotFound} />
        </Switch>
        
      </div>

      <Footer />
    </>
  );
}

export default App;
