import React from 'react';

const Product = ({index,id,name,description,price,status}) => (
    <tr key={index}>
            <th scope="row">{index+1}</th>
            <td> {name}</td>
            <td> {description}</td>
            <td> {price}</td>
            <td> Edit | Sold | Lost | Delete</td>
        </tr>
)

export default Product;