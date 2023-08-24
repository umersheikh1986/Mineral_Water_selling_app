import React,{useEffect} from 'react'
import {Form,Input,Button,message}from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const onFinish = async(e)=>{
      try {
        dispatch({
          type : "SHOW_LOADING",

        })
      const res =  await axios.post("/api/users/login",e)
        dispatch({type : "HIDE_LOADING"})
        message.success("User Login Successfully");
        navigate('/')
       localStorage.setItem('auth',JSON.stringify(res.data))

    } catch (error) {
     dispatch({type : "HIDE_LOADING"})
     message.error('Something went wrong')
     console.log(error)
    }

    }


    // currently login user
    useEffect(()=>{
      if(localStorage.getItem("auth"))
      {
      localStorage.getItem("auth");
       navigate('/')
      }
    },[navigate])
  return (
    <>
    <div className="register" >
      <div className='register-form' style={{ padding : "120px",alignItems:'center'}}  >
      
      
      <h3 style={{width:"180px",marginLeft:"100px",marginRight:"20px"}}> Login Page</h3>
    
      <Form layout = "veritcal"  onFinish={onFinish}> 
    
 
      <Form.Item  label="Admin User ID"  style={{width:"290px"}} > <br/>
      <Form.Item name ="userId">
      <Input   required />
      </Form.Item>
        
      </Form.Item>
      <Form.Item   label="Password" style={{width:"250px"}} > <br/>
         <Form.Item name ="password">
         <Input type='password'  required />
         </Form.Item>
      
      </Form.Item>
    
    
     <div className='d-flex justify-content-between' >
        <p style={{textAlign:'left',marginLeft:"20px"}}>
                Not a User <Link to="/register"> Register Here</Link>
        </p>
        <br/>
       
          <Button type="primary" htmlType="submit" style={{width:"90px",textAlign:'center',marginLeft:"90px"}}>
            LOGIN
          </Button>
         
         </div>
              
      </Form>
    </div>
    </div>

    
    
    </>
  )
}

export default Login