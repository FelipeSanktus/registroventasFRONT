import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Navbar from '../components/Navbar/Navbar' 
import '../css/Menu.css';
import logo from '../images/avlas.jpeg';

const cookies = new Cookies();

class Menu extends Component{
    



    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container-div">
                   
                     <img className="logo" src={logo}  />
                  
                </div>
            </div>
        );
    }
}

export default Menu;

