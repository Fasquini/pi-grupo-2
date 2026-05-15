import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";

function FormRegistro(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")
  const [error, setError] = useState("")

  function Cambios(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    } else {
      setConfirmarPassword(e.target.value)
    }
  }

  function crearCuenta(e) {
    e.preventDefault();

    if (email === "" || password === "" || confirmarPassword === "") {
      setError("Completá todos los campos")
      return;
    }

    if(password.length<6){
      setError("La contraseña debe tener un mínimo de 6 caracteres")
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden")
      return;
    }

    let usuariosGuardados = localStorage.getItem("usuarios");
    let usuarios = null;

    if (usuariosGuardados === null) {
      usuarios = [];
    } 
    else {
      usuarios = JSON.parse(usuariosGuardados);
    }

    let repetidos = usuarios.filter((usuario) => usuario.email === email);

    if (repetidos.length > 0) {
      setError("Ya existe una cuenta vinculada a este correo")
      return;
    }

    let nuevoUsuario = {
      email: email,
      password: password
    };

    let nuevosUsuarios = usuarios.concat(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

    sessionStorage.setItem("usuarioLogueado", email);

    setEmail("")
    setPassword("")
    setConfirmarPassword("")
    setError("")

    props.history.push("/Login");
  }

  return (
    <section>
      <Header />
      <form className="usuario" onSubmit={(e) => crearCuenta(e)}>
        <h2>¡Bienvenido! Creá tu cuenta</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => Cambios(e)}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Creá una contraseña"
            value={password}
            onChange={(e) => Cambios(e)}
          />
        </div>

        <div>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarPassword"
            placeholder="Confirmá tu contraseña"
            value={confirmarPassword}
            onChange={(e) => Cambios(e)}
          />
        </div>

        <button type="submit">Crear cuenta</button>

        <p className="TengoOno">
          <Link to="/Login">Ya tengo una cuenta</Link>
        </p>
      </form>

      {error !== "" ? <p className="Error" >{error}</p> : ""}
    </section>
  );
}

export default withRouter(FormRegistro);