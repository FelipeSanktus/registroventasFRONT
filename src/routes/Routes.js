import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Products from '../pages/Products';
import AddProduct from '../components/Products/AddProduct';
import EditProduct from '../components/Products/EditProduct';
import Historys from '../pages/Historys';
import Logout from '../components/Logout';
import SoldProducts from '../pages/SoldProducts';
import LostProducts from '../pages/LostProducts';
//import Navbar from '../components/Navbar/Navbar';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/product/add" component={AddProduct}/>
        <Route exact path="/product/:id/edit" component={EditProduct}/>
        <Route exact path="/history" component={Historys}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/sold" component={SoldProducts}/>
        <Route exact path="/lost" component={LostProducts}/>
      </Switch>
    
    </BrowserRouter>
  );
}

export default Routes;
