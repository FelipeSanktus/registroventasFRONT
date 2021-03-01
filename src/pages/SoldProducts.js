import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import SoldProduct from '../components/Products/SoldProduct';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';



const SoldProducts = () =>{
    const cookies = new Cookies();
    const [soldproducts, setSoldProducts] = useState([])
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState(new Date());
    let userId = cookies.get('id');
    const url =  `http://localhost:8080/user/${userId}/sold/items`;
    let token = cookies.get('token');
    let datearray =  date.toLocaleDateString("en-US").split("/")
    let fecha;
    if(datearray[0].length == 1){
      fecha = `${datearray[2]}0${datearray[0]}${datearray[1]}`;
    }
    else{
      fecha =`${datearray[2]}${datearray[2]}${datearray[1]}`;
    }
    

    const getSoldProducts = async () =>{
        const response = await axios.get(url,{headers: {
          'Authorization': `${token}` 
        }}).then(response =>{
          if(response.status ===200){
            setSoldProducts(response.data.products);
            setAmount(response.data.totalAmount);
            setQuantity(response.data.itemQuantiyty);
          }
          else{
              alert("A Error");
          }
        }); 
        
    }

    useEffect(() => {
      getSoldProducts();
    }, [])




    const handleChange= (e)=>{
      console.log(e);
      let datearray =  e.toLocaleDateString("en-US").split("/")
      let fecha;
      if(datearray[0].length == 1){
        fecha = `${datearray[2]}0${datearray[0]}${datearray[1]}`;
      }
      else{
        fecha =`${datearray[2]}${datearray[2]}${datearray[1]}`;
      }
      let urlBase = `http://localhost:8080/user/${userId}/sold/items/${fecha}`
      console.log("fecha "+fecha);
      console.log("url "+urlBase);
      const response = axios.get(urlBase,{headers: {
        'Authorization': `${token}` 
      }}).then(response =>{
        console.log(response);
        if(response.status === 200){
          if(response.data != ""){
            console.log(response);
            setSoldProducts(response.data.products);
            setAmount(response.data.totalAmount);
            setQuantity(response.data.itemQuantiyty);
          }
            else{
              alert("No items found");
              setSoldProducts("");
              setAmount(0);
              setQuantity(0);
            }
    
        }
        else{
          alert("No items found");
        }
      });
      
  };
 
 


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
        <th scope="col">Total amount: ${amount}</th>
        <th scope="col">Item quantity: {quantity}</th>
        <th scope="col">Filter:
        <DatePicker selected={date} format="yyyy-dd-mm" onChange={handleChange}  />
        </th>
      
      </tr>
  
      
    </thead>
      {renderProducts()}
  </table>
     
      </div>
    
     
    );
}

export default SoldProducts;


