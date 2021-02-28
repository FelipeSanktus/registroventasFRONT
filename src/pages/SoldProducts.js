import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import SoldProduct from '../components/Products/SoldProduct';

const SoldProducts = () =>{
    const cookies = new Cookies();
    const [soldproducts, setSoldProducts] = useState([])
    let userId = cookies.get('id');
    const url =  `http://localhost:8080/user/${userId}/sold/items`;
    let token = cookies.get('token');
    let sum = 0;
    const getSoldProducts = async () =>{
        const response = await axios.get(url,{headers: {
          'Authorization': `${token}` 
        }}).then(response =>{
          if(response.status ===200){
            setSoldProducts(response.data);
            response.data.forEach(product => {
              sum = sum+product.price;
            });
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
        <th scope="col">Sale date</th>
        <th scope="col">Total amount: {sum}</th>
        <th scope="col"> <button 
                   type="submit"
                   className="btn btn-primary"
                   onClick={()=> window.location.href="./sold"}
               >New product</button></th>
      </tr>
  
      
    </thead>
      {renderProducts()}
  </table>
     
      </div>
    
     
    );
}

export default SoldProducts;


