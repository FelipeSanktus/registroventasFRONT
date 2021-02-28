import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Product from '../components/Products/Product';

const Products = () =>  {

  const cookies = new Cookies();
  const [products, setProducts] = useState([])
  let userid = cookies.get('id');
  let token = cookies.get('token');
  const url= `http://localhost:8080/user/${userid}/products`;
  const productstate = ["In Inventory", "Sold", "Lost"];

  const getProducts = async () =>{
    
      const response = await axios.get(url+"/all",{headers: {
        'Authorization': `${token}` 
      }});
     
      console.log(response.data)
      setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, [])

  const handleDelete = (id) =>{
    const finalUrl = url+`/${id}`;
    axios.delete(finalUrl,{headers: {
      'Authorization': `${token}` 
    }})
    .then(
      res=> {
        if(res.status != 200){
          alert("Can't delete this resource")
        }
        else{
          alert("Product eliminated")
          getProducts();
        }
      }
    )
  }


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
          status = {productstate[product.status]}
          onDelete = {handleDelete}

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
      <th scope="col">Status</th>
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