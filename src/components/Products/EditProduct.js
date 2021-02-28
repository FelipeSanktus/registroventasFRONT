import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';


const EditProduct = (props) => {

    const cookie = new Cookies();
    const userId = cookie.get("id");
    const token = cookie.get("token");
    const urlBase = `http://localhost:8080/user/${userId}/`;
   
    

    const {id} = props.match.params;



    const options = [
        {
          label: "In Inventory",
          value: 0,
        },
        {
          label: "Sold",
          value: 1,
        },
        {
          label: "Lost",
          value: 2,
        }
       
      ];

    const [product, setProduct] = useState({
        name:'',
        description:'',
        price:'',
        state:0
    });

    const handleChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value
           
        })
        console.log(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        saveProduct();

    }

    const saveProduct = ()  =>{
        console.log(product);
        axios.put(urlBase+`products/${id}`,product,{
            headers: {
            'Authorization': `${token}` 
          }}).
        then(res =>{
            
            if(res.status == 200){
                props.history.push('/products');
            }
        })
    };

    

      


    useEffect(() => {
        const getProduct = ()=>{
            axios.get(urlBase+`product/${id}`,
            {headers: {
                'Authorization': `${token}` 
              }}).then(res =>{
                  if(res.data.status === 1){
                      alert("This product has been sold and cannot be edited")
                      props.history.push('/products');
                      
                  }
                  else if(res.data.status === 2){
                    alert("This product has been lost and cannot be edited")
                    props.history.push('/products');
                     
                  }
                  else if(res.data.status === 0){
                    setProduct(res.data);
                  }
                  else{
                      alert("Product not found");
                  }
              })
        }

        getProduct();

    }, [id]);

    

    return  (
        <div>
            <Navbar/>
             <form
             onSubmit={handleSubmit}
         >
             <div className="form-group">
                  <label htmlFor="name">Product name</label>
                  <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter a product name"
                  defaultValue={product.name}
                  onChange={handleChange}
                  required/>
             </div>
             <div className="form-group">
                  <label htmlFor="description">Product description</label>
                  <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Enter a product description"
                  defaultValue={product.description}
                  onChange={handleChange}
                  required/>
             </div>
             <div className="form-group">
                  <label htmlFor="price">Product price</label>
                  <input
                  type="number"
                  min="1"
                  step="any"
                  className="form-control"
                  name="price"
                  placeholder="Enter a product price"
                  defaultValue={product.price}
                  onChange={handleChange}
                  required/>
             </div>
             <div className="form-group">
                  
                  <label htmlFor="price">Product status</label>
                  <select className="form-select" name ="status" key={product.state} defaultValue={product.state} onChange={handleChange}>
                        {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                        ))}
                 </select>
             </div>
             
             <button    
                 type="submit"
                 className="btn btn-primary"
             >Save product</button>
 
         </form>
        </div>
    )

}





export default withRouter(EditProduct);
