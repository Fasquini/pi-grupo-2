import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";
const cookie = new Cookies()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  Cambios(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  iniciarSesion(e) {
    e.preventDefault();

    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        error: "Completá todos los campos"
      });
      return;
    }

    let usuariosGuardados = localStorage.getItem("usuarios");
    let usuarios = localStorage.getItem("usuarios") === null? [] : JSON.parse(localStorage.getItem("usuarios"));

    if (usuariosGuardados === null) {
      this.setState({
        error: "No hay usuarios registrados"
      });
      return;
    } 
    else {
      usuarios = JSON.parse(usuariosGuardados);
    }

    let usuarioCorrecto = usuarios.filter(
      (usuario) =>
        usuario.email === this.state.email &&
        usuario.password === this.state.password
    );

    if (usuarioCorrecto.length === 0) {
      this.setState({
        error: "Email o contraseña incorrectos"
      });
      return;
    }

    sessionStorage.setItem("usuarioLogueado", this.state.email);
    cookie.set("user-auth-cookie", this.state.email)

    this.setState({
      email: "",
      password: "",
      error: ""
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <section>
        <Header />
        <form className="usuario" onSubmit={(e) => this.iniciarSesion(e)}>
          <h2>¡Bienvenido! Ingresá tu cuenta</h2>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.Cambios(e)}
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={(e) => this.Cambios(e)}
            />
          </div>

          <button type="submit">Iniciar sesión</button>

          <p className="TengoOno">
            <Link to="/Registro">Crear una cuenta</Link>
          </p>
        </form>

        {this.state.error !== "" ? <p className="Error">{this.state.error}</p> : null}
      </section>
    );
  }
}

export default withRouter(Login);