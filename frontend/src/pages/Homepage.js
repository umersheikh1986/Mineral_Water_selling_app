import React, { useEffect, useState } from 'react'
import DefaultLayout from "../components/DefaultLayout"
import axios from 'axios';
import { Row,Col } from 'antd';
import ItemList from "../components/ItemList"
import { useDispatch } from 'react-redux';
const Homepage = () => {
  const [itemsData,setItemsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
   const getAllItems = async()=>{
    try {
      dispatch({
         type :"SHOW_LOADING"

      })
       const {data} = await axios.get('/api/items/get-item');
       setItemsData(data);
       dispatch({type:"HIDE_LOADING"})
       console.log(data);
    } catch (error) {
      
      console.log(error);
    }


   }
      getAllItems();
  },[dispatch])




  return (
    // <h1> Homepage</h1>
    < DefaultLayout>
   <Row>
    {
      itemsData.map(item=>(
            <Col xs={24} lg={6} md={12} sm={6}>
           <ItemList item={item}/>
            </Col>
      ))  
}
    </Row>  
  </DefaultLayout>
    
  )
}

export default Homepage