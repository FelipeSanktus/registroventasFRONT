import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar/Navbar' 
import '../css/Menu.css';
const cookies = new Cookies();

class Menu extends Component{
    

    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('token', {path: "/"});
        cookies.remove('authorities', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('username : '+cookies.get('username'));
        console.log('token: '+cookies.get('token'));
        console.log('authorities: '+cookies.get('authorities'));
        return (
            <div>
                <Navbar />
            </div>
        );
    }
}

export default Menu;

