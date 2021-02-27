import React,{useState} from 'react';
import Navbar from '../Navbar/Navbar'


const AddProduct = () => {
    const [product, setProduct] = useState({
        name:'',
        description:'',
        price:''
    });


    const handleSubmit = (e)=>{
        e.preventDefault();
        //saveproduct
    }

    const handleChange= (e)=>{
        setProduct({
            ...product,
            [e.target.name]: e.target.value

        });
    };

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
                  name="name"
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

export default AddProduct;







