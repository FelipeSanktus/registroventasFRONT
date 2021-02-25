import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:8080/login";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }


    iniciarSesion2(){
        console.log(this.state.form.username);
        console.log(this.state.form.password);
    }


    iniciarSesion=async()=>{
        await axios.post(baseUrl, {username: this.state.form.username, password: this.state.form.password})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                
                cookies.set('token', response.token, {path: "/"});
                cookies.set('username', response.username, {path: "/"});
                cookies.set('authorities', response.authorities, {path: "/"});
                alert(`Bienvenido ${response.username} `);
                window.location.href="./menu";
            }else{
                console.log(response.data);
                cookies.set('token', response.token, {path: "/"});
                cookies.set('username', response.username, {path: "/"});
                cookies.set('authorities', response.authorities, {path: "/"});
                cookies.set('id', response.id, {path: "/"});
                alert(`Bienvenido ${response.token} `);
                window.location.href="./menu";
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('token')){
            window.location.href="./menu";
        }
    }
    

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
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
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;