
import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Product from '../components/Products/Product';

function Products() {

  const cookies = new Cookies();
  const [products, setProducts] = useState([])
  const formatUrl = (name, age) => `http://localhost:8080/user/${id}/products`;
  let id = cookies.get('id');
  let token = cookies.get('token');
  let url = formatUrl(id); 

  const getProducts = async () =>{
    
      const response = await axios.get(url,{headers: {
        'Authorization': `${token}` 
      }});
      console.log(response.data['content']);

      setProducts(response.data['content']);
  }

  useEffect(() => {
    getProducts();
  }, [])

  const renderProducts = () =>{
    return (
      <tbody>
      {
        products.map((product, index)  =>(
          <Product
          key = {index}
          index = {index}
          id = {product.id}
          name = {product.name}
          description = {product.description}
          price = {product.price}
          status = {product.status}
          />
            
        ))
      }
      </tbody>
    )
  }
   
  const addProduct = ()=>{
    window.location.href="./product/add";
    //saveproduct
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
      <th scope="col"> <button 
                 type="submit"
                 className="btn btn-primary"
                 onClick={()=> window.location.href="./product/add"}
             >New product</button></th>
    </tr>

    
  </thead>
    {renderProducts()}
</table>
   
    </div>
  
   
  );
}

export default Products;