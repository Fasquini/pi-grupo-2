import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";
const cookie = new Cookies()

function Login(props) {
  const[email, setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[error,setError] = useState("")


  function Cambios(e) {
  if (e.target.name === "email") {
    setEmail(e.target.value)
  }
  if (e.target.name === "password") {
    setPassword(e.target.value)
  }
}

  function iniciarSesion(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Completá todos los campos" );
      return;
    }

    let usuariosGuardados = localStorage.getItem("usuarios");
    let usuarios = localStorage.getItem("usuarios") === null ? [] : JSON.parse(localStorage.getItem("usuarios"));

    if (usuariosGuardados === null) {
      setError("No hay usuarios registrados" );
      return;
    }
    else {
      usuarios = JSON.parse(usuariosGuardados);
    }

    let usuarioCorrecto = usuarios.filter(
      (usuario) =>
        usuario.email === email &&
        usuario.password === password
    );

    if (usuarioCorrecto.length === 0) {
      setError("Email o contraseña incorrectos" )
      return;
    }

    sessionStorage.setItem("usuarioLogueado", email);
    cookie.set("user-auth-cookie", email)

    setEmail("")
    setPassword("")
    setError("")

    props.history.push("/");
  }


  return (
    <section>
      <Header />
      <form className="usuario" onSubmit={(e)=>iniciarSesion(e)}>
        <h2>¡Bienvenido! Ingresá tu cuenta</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>Cambios(e)}  
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e)=>Cambios(e)}  
          />
        </div>

        <button type="submit">Iniciar sesión</button>

        <p className="TengoOno">
          <Link to="/Registro">Crear una cuenta</Link>
        </p>
      </form>

      {error !== "" ? <p className="Error">{error}</p> : null}
    </section>
  );

}

export default withRouter(Login);