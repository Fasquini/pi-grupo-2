import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { withRouter } from "react-router-dom";

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

    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmarPassword === ""
    ) {
      this.setState({ error: "Completá todos los campos" });
      return;
    }

    if (this.state.password !== this.state.confirmarPassword) {
      this.setState({ error: "Las contraseñas no coinciden" });
      return;
    }

        localStorage.setItem("Usuario", this.state.email);
        localStorage.setItem("contraseñaUsuario", this.state.password);
    
        this.setState({ error: "" });

    

    this.props.history.push("/");
  }

  render() {
    return (
      <section>
        <form className="usuario" onSubmit={(e) => this.crearCuenta(e)}>
          <h2>¡Bienvenido! Creá tu cuenta</h2>
          <div>
          <label for="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.Cambios(e)}
          />
        </div>
        <div>
          <label for="">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Creá una contraseña"
            value={this.state.password}
            onChange={(e) => this.Cambios(e)}
          />
        </div>

        <div>
          <label for="">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarPassword"
            placeholder="Confirmá tu contraseña"
            value={this.state.confirmarPassword}
            onChange={(e) => this.Cambios(e)}
          />
        </div>

          <button type="submit">Crear cuenta</button>
          <p className="TengoOno"><Link to="/Login">Ya tengo una cuenta</Link></p>
        </form>

        {this.state.error !== "" ? <p>{this.state.error}</p> : null}
      </section>
    );
  }
}

export default withRouter(FormRegistro);
