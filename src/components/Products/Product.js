import React from 'react';
import {Link} from 'react-router-dom';

const Product = ({index,id,name,description,price,status, onDelete}) => (
    
    <tr key={index}>
            <th scope="row">{index+1}</th>
            <td> {name}</td>
            <td> {description}</td>
            <td> {price}</td>
            <td> {status}</td>
            <td> 
            <Link to={`/product/${id}/edit`}
                 className="btn btn-success mr-1"
                    role="button"
                    aria-pressed="true"
            >Edit 
                
            </Link>
            <button    
                 type="button"
                 className="btn btn-danger"
                 onClick={() => {onDelete(id);}}
             >Delete</button>

            </td>
        </tr>
)

export default Product;