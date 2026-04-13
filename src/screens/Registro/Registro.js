import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class FormRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmarPassword: "",
      error: ""
    };
  }

  Cambios(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  crearCuenta(e) {
    e.preventDefault();

    if (this.state.email === "" || this.state.password === "" || this.state.confirmarPassword === "") {
      this.setState({ error: "Completá todos los campos" });
      return;
    }

    if(this.state.password.length<6){
      this.setState({error: "La contraseña debe tener un mínimo de 6 caracteres"})
      return;
    }

    if (this.state.password !== this.state.confirmarPassword) {
      this.setState({ error: "Las contraseñas no coinciden" });
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

    let repetidos = usuarios.filter((usuario) => usuario.email === this.state.email);

    if (repetidos.length > 0) {
      this.setState({
        error: "Ya existe una cuenta vinculada a este correo"
      });
      return;
    }

    let nuevoUsuario = {
      email: this.state.email,
      password: this.state.password
    };

    let nuevosUsuarios = usuarios.concat(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

    sessionStorage.setItem("usuarioLogueado", this.state.email);

    this.setState({
      email: "",
      password: "",
      confirmarPassword: "",
      error: ""
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <section>
        <form className="usuario" onSubmit={(e) => this.crearCuenta(e)}>
          <h2>¡Bienvenido! Creá tu cuenta</h2>

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
              placeholder="Creá una contraseña"
              value={this.state.password}
              onChange={(e) => this.Cambios(e)}
            />
          </div>

          <div>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmarPassword"
              placeholder="Confirmá tu contraseña"
              value={this.state.confirmarPassword}
              onChange={(e) => this.Cambios(e)}
            />
          </div>

          <button type="submit">Crear cuenta</button>

          <p className="TengoOno">
            <Link to="/Login">Ya tengo una cuenta</Link>
          </p>
        </form>

        {this.state.error !== "" ? <p className="Error" >{this.state.error}</p> : ""}
      </section>
    );
  }
}

export default withRouter(FormRegistro);