import React,{useEffect,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {Modal, Button, Table,Form,Select, Input ,message} from 'antd'
import {DeleteOutlined,EditOutlined } from '@ant-design/icons';
const ItemPage = () => {
  const [itemsData,setItemsData] = useState([]);
 const dispatch = useDispatch();
 const[PopUpMOdal,setpopmodal] = useState(false);
 const [editItem,setItemEdit] = useState(null);

  
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
    
   
//
useEffect(()=>{
  getAllItems();
  //eslint-disable-next-line
},[]);

// handleDelete

const handleDelete = async(record)=>{
 
  
   try {
     dispatch({
        type :"SHOW_LOADING",
 
     });
       await axios.delete('api/items/delete-item',{itemId:record._id});
 
      
      
       getAllItems();
       message.success('Item Deleted Sucessfully')
       setpopmodal(false);
       dispatch({type:"HIDE_LOADING"})
   }catch (error) {
    dispatch({type:"HIDE_LOADING"})
    message.error('something went wrong')
   console.log(error);
 }


}
   // table 
   const columns = [
    {title:'Name' ,dataIndex :'name'},
    {title:'Image' ,dataIndex :'image',
        render:(image,record)=><img src={image} alt={record.name} height="60" width="60"/>

},
{title:'Price' ,dataIndex :'price'},

{title:'Actions' ,dataIndex :'_id',render:(id,record)=>(
<div>
  
  <EditOutlined style={{cursor:'pointer'}} 
  onClick={()=>{
    setItemEdit(record)
    setpopmodal(true)

  }}
  
  
  />
   <DeleteOutlined style={{cursor:'pointer'}} 
   onClick={

  () =>{ handleDelete(record)
  }}
  
  /> 

</div>

)
},
]

// handleSubmit
const handleSubmit = async(value) =>{

 console.log(value);
 if(editItem ===null)
 {
  try {
    dispatch({
       type :"SHOW_LOADING"

    })
     const res = await axios.post('/api/items/add-item',value);

      message.success('Item Added Sucessfully')
     
      getAllItems();
      setpopmodal(false);
      dispatch({type:"HIDE_LOADING"})
  } catch (error) {
     message.error('something went wrong')
    console.log(error);
  }

 }
 else
 {
  try {
    dispatch({
       type :"SHOW_LOADING"

    })
      await axios.put('/api/items/edit-item',{
        ...value,
        itemId:editItem._id
      });

      message.success('Item updated Sucessfully')
     
      getAllItems();
      setpopmodal(false);
      dispatch({type:"HIDE_LOADING"})
  } catch (error) {
     message.error('something went wrong')
    console.log(error);
  }

 }
  
  

}
 
  return (
    <DefaultLayout>
        <div className='d-flex justify-content-between' > 
        <h1> ItemList</h1>
        <Button type='primary' onClick={()=>setpopmodal(true)} > Add Item </Button>
        </div>
        <Table columns={columns} dataSource={itemsData} bordered/>
      {
        PopUpMOdal &&  ( 
        <Modal
         title={`${editItem !==null ? 'Edit Item':'Add New Item'}`} 
         open={PopUpMOdal}  onCancel={()=>{
       setItemEdit();
        setpopmodal(false); }} footer={false} >
      <Form layout = "veritcal" initialValues={editItem} onFinish={handleSubmit}> 
      <Form.Item  name ="name" label="Name" >
        <Input/>
      </Form.Item>
      <Form.Item  name ="price" label="Price" >
        <Input/>
      </Form.Item>
      <Form.Item  name ="image" label="ImageURL" >
        <Input/>
      </Form.Item>
      <Form.Item  name="category" label="Category">
      <Select>
        <Select.Option value=" 330ml "> 330ml </Select.Option>
        <Select.Option value="500ml"> 500ml </Select.Option>
        <Select.Option value="1 litre "> 1 litre </Select.Option>
        <Select.Option value="1 litre "> 1500 litre </Select.Option>
        <Select.Option value="1 litre "> 19 litre </Select.Option>
        <Select.Option value="1 litre "> 5 litre </Select.Option>
        

     </Select>

      </Form.Item>
    
     <div className='d-flex justify-content-end'>
          <Button type='primary' htmlType='submit'>save</Button>
            
         </div>

      </Form>
      </Modal>
     ) }
    </DefaultLayout>
  )
}

export default ItemPage