import React,{useEffect} from 'react'
import {Form,Input,Button, message}from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";
import {useDispatch} from "react-redux";




const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
     const onFinish = async (e)=>{
       try {
           dispatch({
             type : "SHOW_LOADING",

           })
            await axios.post("/api/users/register",e)
         
           message.success("User Registered Successfully");
           navigate('/login') 
           dispatch({type : "HIDE_LOADING"})


       } catch (error) {
        dispatch({type : "HIDE_LOADING"})
        message.error('Something went wrong')
        console.log(error)
       }

    }

      // currently login user
      useEffect(()=>{
        if(localStorage.getItem("auth")){
        localStorage.getItem("auth")
         navigate('/')
        }
  
      },[navigate])
  return (
    <>
    <div className="register">
      <div className='register-form'>
      
      
      <h3 style={{width:"220px",marginLeft:"120px",marginRight:"10px"}}> Register Page</h3>
    
      <Form layout = "veritcal"  onFinish={onFinish}> 
      <Form.Item  label="username"  style={{width:"250px",marginLeft:"40px"}}  > <br/>
        <Form.Item name="name">
        <Input  required/>
        </Form.Item>
      </Form.Item>
      <Form.Item  label="User ID"  style={{width:"250px",marginLeft:"40px"}} > <br/>
      <Form.Item name ="userId">
      <Input   required />
      </Form.Item>
        
      </Form.Item>
      <Form.Item   label="Password" style={{width:"250px",marginLeft:"40px"}} > <br/>
         <Form.Item name ="password">
         <Input type='password'  required />
         </Form.Item>
      
      </Form.Item>
    
    
     <div className='d-flex justify-content-between' >
        <p style={{textAlign:'right',marginLeft:"80px"}}>
                Already Registered please <Link to="/login"> Login Here</Link>
        </p>
        <br/>
       
          <Button type="primary" htmlType="submit" style={{width:"70px",textAlign:'center',marginLeft:"60px"}}>
            Register
          </Button>
         
         </div>
              
      </Form>
    </div>
    </div>

    </>
  )
}

export default Register