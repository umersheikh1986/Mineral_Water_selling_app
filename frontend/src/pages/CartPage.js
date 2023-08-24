import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import {DeleteOutlined ,PlusCircleOutlined,MinusCircleOutlined  } from '@ant-design/icons';
import { Button, Modal, Table , Form ,Input,Select, message} from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const CartPage = () => {
    const [subTotal,setSubTotal] = useState(0);
    const [billPopup,setBillPopup] =useState(false);
     const  dispatch = useDispatch(); 
     const navigate = useNavigate(); 
    const {cartItems} = useSelector(state =>state.rootReducer);
    // handleIncreament
    const handleIncreament = (record)=>{
    dispatch({
             type : "UPDATE_CART",
             payload : {...record,quantity:record.quantity + 1}
 

    })


    };
    const handleDecreament = (record)=>{
        if(record.quantity!==1){
            dispatch({
                type : "UPDATE_CART",
                payload : {...record,quantity:record.quantity - 1}
    
   
       })

        }
        

    }

    const columns = [
        {title:'Name' ,dataIndex :'name'},
        {title:'Image' ,dataIndex :'image',
            render:(image,record)=><img src={image} alt={record.name} height="60" width="60"/>

    },
    {title:'Price' ,dataIndex :'price'},
    {title:'Quantity',dataIndex :'_id',render:(id,record)=> <div>

<PlusCircleOutlined classname="mx-3" style={{cursor:'pointer'}} onClick={()=>handleIncreament(record)} />
<b>{record.quantity}</b>
<MinusCircleOutlined classname="mx-3" style={{cursor:'pointer'}} onClick={()=>handleDecreament(record)} />
    </div>

  
    },
    {title:'Actions' ,dataIndex :'_id',render:(id,record)=><DeleteOutlined style={{cursor:'pointer'}} onClick={()=>dispatch({
   type : "DELETE_FROM_CART",
   payload : record

    })} />}




    ]

    useEffect(()=>{
      let temp =0 ;
      cartItems.forEach((item) => (temp = temp + item.price * item.quantity ));
      setSubTotal(temp);

    },[cartItems])

    // handleSubmit
    const handleSubmit = async(e)=>{
        try {
            const newObject = {
                ...e,
                cartItems,
                subTotal,
                deliveryCharges : Number(100),
                totalAmount : Number( Number(subTotal) + Number(100) ),
                userId: JSON.parse(localStorage.getItem('auth'))._id
            };
               await axios.post('/api/bills/add-bills',newObject);
               message.success("Bill created")
               navigate('/bills');
        } catch (error) {
            message.error('something went wrong')
            console.log(error); 
        }
        
    }
  return (
     <DefaultLayout>

        <h1>CartPage</h1>
        <Table columns={columns} dataSource={cartItems} bordered/>
        <div className='d-flex flex-column align-items-end'>
            <hr/>
            <h3>sub Total : PKR<b> {subTotal}</b>/-</h3>
          <Button type='primary' onClick={()=> setBillPopup(true)}> Create Invoice   </Button>

        </div>
        <Modal title="Create Invoice" open={billPopup} onCancel={()=>setBillPopup(false)} footer={false}>

        <Form layout = "veritcal"  onFinish={handleSubmit}> 
      <Form.Item  name ="customerName" label="Customer Name" >
        <Input/>
      </Form.Item>
      <br/>
      <Form.Item  name ="customerContact" label="Customer Phone" >
        <Input/>
      </Form.Item>
      <br/>
      <Form.Item  name="paymentMode" label="Payment  Mode">
      <Select>
        <Select.Option value="cash "> Cash </Select.Option>
        <Select.Option value="card"> Card</Select.Option>
        
        

     </Select>

      </Form.Item>
      <div className='bill-it'>
      <h5>
        Sub Total  : <b> {subTotal}</b>

      </h5>
      <h4>
           DeliveyCharges : 
           <b>{100}</b>

      </h4>
      <h3>
        
           GRAND TOTAL - <b> 
           {
            Number(subTotal) + Number(100)  
           }

        </b>

      </h3>

      </div>
     <div className='d-flex justify-content-end'>
          <Button type='primary' htmlType='submit'>
            generate bill
            </Button>
            
         </div>

      </Form>
        </Modal>
        </DefaultLayout>
  )
}

export default CartPage;