import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";
const cookie = new Cookies()

function Login(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    error: ""
  })

  function Cambios(e) {
    setForm({ [e.target.name]: e.target.value })
  }

  function iniciarSesion(e) {
    e.preventDefault();

    if (form.email === "" || form.password === "") {
      setForm({ error: "Completá todos los campos" });
      return;
    }

    let usuariosGuardados = localStorage.getItem("usuarios");
    let usuarios = localStorage.getItem("usuarios") === null ? [] : JSON.parse(localStorage.getItem("usuarios"));

    if (usuariosGuardados === null) {
      setForm({ error: "No hay usuarios registrados" });
      return;
    }
    else {
      usuarios = JSON.parse(usuariosGuardados);
    }

    let usuarioCorrecto = usuarios.filter(
      (usuario) =>
        usuario.email === form.email &&
        usuario.password === form.password
    );

    if (usuarioCorrecto.length === 0) {
      setForm({ error: "Email o contraseña incorrectos" })
      return;
    }

    sessionStorage.setItem("usuarioLogueado", form.email);
    cookie.set("user-auth-cookie", form.email)

    setForm({
      email: "",
      password: "",
      error: ""
    });

    props.history.push("/");
  }


  return (
    <section>
      <Header />
      <form className="usuario" onSubmit={iniciarSesion}>
        <h2>¡Bienvenido! Ingresá tu cuenta</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={Cambios}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={Cambios}
          />
        </div>

        <button type="submit">Iniciar sesión</button>

        <p className="TengoOno">
          <Link to="/Registro">Crear una cuenta</Link>
        </p>
      </form>

      {form.error !== "" ? <p className="Error">{form.error}</p> : null}
    </section>
  );

}

export default withRouter(Login);