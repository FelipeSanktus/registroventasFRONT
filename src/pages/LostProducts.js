import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import SoldProduct from '../components/Products/SoldProduct';
import Calendar from '../components/Calendar';

let amount = 0;

const LostProducts = () =>{
    const cookies = new Cookies();
    const [soldproducts, setSoldProducts] = useState([])
    let userId = cookies.get('id'); 
    const url =  `http://localhost:8080/user/${userId}/lost/items`;
    let token = cookies.get('token');
    const getSoldProducts = async () =>{
        const response = await axios.get(url,{headers: {
          'Authorization': `${token}` 
        }}).then(response =>{
          if(response.status ===200){
            setSoldProducts(response.data); 
          }
          else{
              alert("A Error");
          }
        }); 
        

    }

    useEffect(() => {
      getSoldProducts();
    }, [])




  


    const renderProducts = () =>{
      return (
        <tbody>
        {
          soldproducts.map((product, index)  =>(
            <SoldProduct
            key = {index}
            index = {index}
            id = {product.id}
            name = {product.name}
            description = {product.description}
            price = {product.price}
            saleDate = {product.saleDate}
            />
              
          ))
        }
        </tbody>
      )
    }

  


    return (
      <div>
      <Navbar />
      <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">Lost date</th>
      
      </tr>
  
      
    </thead>
      {renderProducts()}
  </table>
     
      </div>
    
     
    );
}

export default LostProducts;
