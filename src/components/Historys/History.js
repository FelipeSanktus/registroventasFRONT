import React from 'react';


const History = ({index,id,action,publishedDate}) => (
    
    <tr 
    key={index}>
            <th scope="row">{index+1}</th>
            <td> {action}</td>
            <td> {publishedDate}</td>
         
    </tr>
)

export default History;