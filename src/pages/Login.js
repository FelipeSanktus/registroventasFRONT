import React, { Component } from 'react'
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const loginUrl = "http://6959677a607a.ngrok.io:8080/login";




class Login extends Component{
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({form:{
            ...this.state.from,
            [e.target.name]: e.target.value
        }});
        console.log(this.state.form);
    }

    iniciarSesion=async()=>{
        await (await axios.post(loginUrl,{params: {username: this.state.form.username, password: this.state.form.password}}))
        .then(response=>{
            console.log("todo bien mano");
        })
        .catch(error=>{
            console.log("mal mano");
        })
    }
    



    render(){
        return (
            <div className="containerPrincipal">
                <div className="containerSegundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={()=>this.iniciarSesion()}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;