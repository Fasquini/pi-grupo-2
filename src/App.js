import { Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./screens/Home/Home";
import UnaPelicula from "./screens/UnaPelicula/UnaPelicula";
import VerTodas from "./screens/VerTodas/VerTodas";
import Favoritas from "./screens/Favoritas/Favoritas";
import Registro from "./screens/Registro/Registro";
import Login from "./screens/Login/Login";
import Populares from"./screens/Populares/Populares";
import Pronto from"./screens/Pronto/Pronto";
import TopRated from "./screens/TopRated/TopRated"
import NotFound from "./screens/NotFound/NotFound";
import Resultados from "./screens/Resultados/Resultados";

function App() {
  return (
    <>
      <div id="divContenedor">

          <Header />

          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/UnaPelicula/:id" component={UnaPelicula} />
            <Route path="/Resultados/:busqueda" component={Resultados} />
            <Route path="/VerTodas" component={VerTodas} />
            <Route path="/TopRated" component={TopRated} />
            <Route path="/Populares" component={Populares} />
            <Route path="/Pronto" component={Pronto} />
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
