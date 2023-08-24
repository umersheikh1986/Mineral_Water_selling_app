import {React,useEffect,useState} from "react";
import { Layout, Menu ,Button, Row} from "antd";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined 
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout  = ({children})=>{
  const navigate = useNavigate()
    const {cartItems ,loading} = useSelector((state) =>state.rootReducer);
    const [collapsed,setCollapsed] = useState(false);
    
   
    useEffect(()=>{

 localStorage.setItem("cartItems",JSON.stringify(cartItems))

    },[cartItems])
 


    return (
      <Layout>
      {loading && <Spinner/>}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h1 className="text-center text-light font-wight-bold mb-20">Instant Water</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            {/* <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Cutomers</Link>
            </Menu.Item> */}
            <Menu.Item key="/logout" icon={<LogoutOutlined />}
             onClick={()=>{
              localStorage.removeItem('auth')
              navigate("/login")
             }}
            
            >
              Logout 
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
       <Header style={{ padding: 0,marginRight:16,marginLeft:16,color:"white" , display:"flex",justifyContent:"space-between" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 62,
            height: 64,
            color:"white"
          }}
           
        />
        <div  className="cart-item" onClick={()=>navigate('/cart')} style={{ width:20, lineHeight:4, color:"white" , display:"flex",justifyContent:"space-around",flexDirection:Row }}>
        
        <p >{cartItems.length}</p>
        < ShoppingCartOutlined   style={{
          fontSize: '1600px',
          width: "600px",
          marginTop :30,
          height: "100px",
          fontWeight :"bolder",
          color:"white"
        }} />
         
        
      
        </div>
        </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
 export default DefaultLayout;