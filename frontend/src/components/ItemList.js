import { Button,Card } from 'antd';
import React from 'react';
import {useDispatch} from "react-redux"


const ItemList = ({item}) => {
   const dispatch = useDispatch();
   
  const handleAddToCart = () =>{
      dispatch({
         type :"ADD_TO_CART",
         payload : {...item,quantity:1} 

      })
  }
  const {Meta} = Card;
  return (
    <div>
    <div>
     
  
   <Card

    style={{ width:240,marginBottom : 20, height:290 }}
    cover={<img alt='' src={item.image} style={{height:170,width:100,marginLeft:50,marginTop:10}}/>}
    
  >
    <Meta title={item.name} />
    <div className='item-button'>

<Button  onClick={()=>handleAddToCart()}>Add to Cart</Button>
    </div>
  </Card>
 
  

      </div>
       


  </div>

  )
}

export default ItemList;