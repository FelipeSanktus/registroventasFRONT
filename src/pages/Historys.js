import Navbar from '../components/Navbar/Navbar';
import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import History from '../components/Historys/History';

const Historys = () =>{
    const cookies = new Cookies();
    const [historys, setHistorys] = useState([])
    let userId = cookies.get('id');
    let token = cookies.get('token');
    const url =  `http://localhost:8080/user/${userId}/history/all`;
  
    const getHisotrys = async () =>{

        const response = await axios.get(url,{headers: {
          'Authorization': `${token}` 
        }});
       
        setHistorys(response.data);
    }

    useEffect(() => {
        getHisotrys();
      }, [])


      const renderHistorys = () =>{
        return (
          <tbody>
          {
            historys.map((history, index)  =>(
              <History
              key = {index}
              index = {index}
              id = {history.id}
              action = {history.action}
              publishedDate = {history.publishedDate}
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
                <th scope="col">Action</th>
                <th scope="col">PublishedDate</th>
                </tr>
            </thead>
                {renderHistorys()}
            </table>
       
        </div>
      );

}


export default Historys;

