import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import SoldProduct from '../components/Products/SoldProduct';
import Calendar from '../components/Calendar';

let amount = 0;

const SoldProducts = () =>{
    const cookies = new Cookies();
    const [soldproducts, setSoldProducts] = useState([])
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = React.useState("");
    let userId = cookies.get('id');
    
    const url =  `http://localhost:8080/user/${userId}/sold/items`;
    let token = cookies.get('token');

    const getSoldProducts = async () =>{
        const response = await axios.get(url,{headers: {
          'Authorization': `${token}` 
        }}).then(response =>{
          if(response.status ===200){
            setSoldProducts(response.data.products);
            setAmount(response.data.totalAmount);
            setQuantity(response.data.itemQuantiyty);
          //  cookies.remove('amount', {path: "/"});
          //  cookies.set("amount",response.data.totalAmount,"/");
           // setAmount(response.data.totalAmount);
            //setQuantity(response.data.itemQuantiyty);
           // setAmount(response.totalAmount);
       
           
          }
          else{
              alert("A Error");
          }
        }); 
        

    }

    useEffect(() => {
      getSoldProducts();
    }, [])


    

 

  const handleTitleChange = ev => {
    setDate(ev.target.value);
    console.log("entro mama");
    updateProduct(date);
  
  }

  const updateProduct = async (fecha)  =>{
    console.log(fecha);
    let urlBase = `http://localhost:8080/user/${userId}/sold/items/${fecha}`
    console.log(urlBase);
    const response = await axios.get(urlBase,{headers: {
        'Authorization': `${token}` 
      }});
    if(response.status === 200){
      if(response.data != ""){
        console.log(response);
        setSoldProducts(response.data.products);
        setAmount(response.data.totalAmount);
        setQuantity(response.data.itemQuantiyty);
      }
        else{
          alert("No items found");
        }

    }
    else{
      alert("No items found");
    }
}


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
        <th scope="col"> 
        <form >          
          <label className="filter">Date:</label>
         <input 
         type="date" 
         name = "date"
         onChange={handleTitleChange}/>
          </form>
        </th>
      
      </tr>
  
      
    </thead>
      {renderProducts()}
  </table>
     
      </div>
    
     
    );
}

export default SoldProducts;


