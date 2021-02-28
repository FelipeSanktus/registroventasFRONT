import React from 'react';


const SoldProduct = ({index,id,name,description,price,saleDate, onDelete}) => (
    
    
    <tr key={index}>
            <th scope="row">{index+1}</th>
            <td> {name}</td>
            <td> {description}</td>
            <td> {price}</td>
            <td> {saleDate}</td>
        </tr>
)

export default SoldProduct;