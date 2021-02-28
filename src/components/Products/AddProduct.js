import Cookies from 'universal-cookie';
import axios from 'axios';
import React,{useState} from 'react';
import Navbar from '../Navbar/Navbar'
import {withRouter} from 'react-router-dom';

const AddProduct = (props) => {

    const cookies = new Cookies();
    const userId = cookies.get("id");
    const urlBase = `http://localhost:8080/user/${userId}/products`
    let token = cookies.get('token');
   // console.log(token)



    const [product, setProduct] = useState({
        name:'',
        description:'',
        price:''
    });

    
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        saveProduct();
        //saveproduct
    }

    const handleChange= (e)=>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value

        });
    };

    const saveProduct = async ()  =>{
        console.log(token);
        const response = await axios.post(urlBase,product,{headers: {
            'Authorization': `${token}` 
          }});
        if(response.status === 200){
            props.history.push('/products');
        }
    }

    

    return (
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
             <button    
                 type="submit"
                 className="btn btn-primary"
             >Save product</button>
 
         </form>
        </div>
        
       

    )
}

export default withRouter(AddProduct);







