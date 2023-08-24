import React,{useEffect,useRef,useState} from 'react'
import {useReactToPrint} from "react-to-print"
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {Button, Modal, Table} from 'antd'
import {EyeOutlined  } from '@ant-design/icons';
const BillsPage = () => {
    const componentRef = useRef()
    const [billsData,setBillsData] = useState([]);
    const dispatch = useDispatch();
    const[PopUpMOdal,setpopmodal] = useState(false);
    const [selectedBill,setSelectedBill] = useState(null);
 
   
     
       const getAllBills = async()=>{
        try {
          dispatch({
             type :"SHOW_LOADING"
    
          })
           const {data} = await axios.get('/api/bills/get-bills');
           setBillsData(data);
           dispatch({type:"HIDE_LOADING"})
           console.log(data);
        } catch (error) {
          
          console.log(error);
        }
           
    
       }
       
      
   //
   useEffect(()=>{
     getAllBills();
     //eslint-disable-next-line
   },[]);
   
   // handlePrint
 const handlePrint = useReactToPrint({

    content : () => componentRef.current,
 })
      

      // table 
      const columns = [
       {title:'ID' ,dataIndex :'_id'},
       {title:'Customer Name' ,dataIndex :'customerName',
          
       },
   {title:'ContactNo' ,dataIndex :'customerContact'},
   {title:'SubTotal' ,dataIndex :'subTotal'},

   {title:'DeliveryCharges' ,dataIndex :'deliveryCharges'},
   {title:'Total Amount' ,dataIndex :'totalAmount'},
   
   {title:'Actions' ,dataIndex :'_id',render:(id,record)=>(
   <div>
     
     <EyeOutlined  style={{cursor:'pointer'}}
     
     onClick={()=>{
        setSelectedBill(record)
        setpopmodal(true)
     }}
     
     />
   
   </div>
   
   )
   },
   ]
   
 
     
  return (
    <DefaultLayout> 
          <div className='d-flex justify-content-between' > 
        <h1>  Invoice List</h1>
   
        </div>
        <Table columns={columns} dataSource={billsData} bordered/>
      {
        PopUpMOdal &&  ( 
        <Modal
         title="Invoice Details"  
         open={PopUpMOdal}  onCancel={()=>{
       
        setpopmodal(false); }} footer={false} >

              <div id='invoice-order' ref={componentRef}>
                 <center id='top'>
                   
                   <div className='info'>
                 <h2> Instant Water </h2>
                  <p> contact : 03125677888 | location : ABC Shop , Karachi </p>
                  </div>
                  { /*   End info */}
                  </center>
              {/* End InvoiceTop */}
              <div id='mid'>
               <div className="mt-2">
                 Customer Name : <b>{selectedBill.customerName}</b>
                <br/>
                phone No : <b>{selectedBill.customerContact}</b>
                  
               <br/>
               Date : <b>{selectedBill.date.toString().substring(0,10)}</b>
               <br/>
               <p>
               <hr style={{margin:"5px"}}/>
                 
               </p>
              </div>
              </div>
              {/* // End of Invoice Mid  */}
                <div id='bot'>
                    <div id="table">
                    <table> 
                      <tbody>
                        <tr className='tabletitle'>
                            <td className='item'>
                                <h3>Item</h3>
                             </td>
                             <td className='Hours'>
                                <h3>QTY</h3>
                             </td>
                             <td className='Rate'>
                                <h3>Price</h3>
                             </td>
                             <td className='Rate'>
                                <h3>Total</h3>
                             </td>
                             </tr>
                            
                        { selectedBill.cartItems.map((item) => (
                            <>
                            <tr className='service'>
                                <td className='tableitem'>
                                    <p className='itemtext'>{item.name}</p>
                                 </td>
                                 <td className='tableitem'>
                                    <p className='itemtext'>{item.quantity}</p>
                                 </td>
                                 <td className='tableitem'>
                                    <p className='itemtext'>{item.price}</p>
                                 </td>
                                 <td className='tableitem'>
                                    <p className='itemtext'>{ item.quantity * item.price}</p>
                                 </td>
                                 </tr>
                                 </>
                        ))}
                                  
                                 <tr className='tabletitle'>
                                    <td/>
                                    <td/>
                                   <td className='Rate'>
                                       <h2>DeliveryCharges</h2>
                                   </td>
                                   <td className='Payment'>
                                       <h2>{selectedBill.deliveryCharges}</h2>
                                   </td>
                                   <hr style={{}}/>
                                   </tr>
                                   <tr className='tabletitle'>
                                     <td/>
                                     <td/>
                                    
                                    
                                     <td className='Rate'>
                                       <h2>Grand Total</h2>
                                   </td>
                                   <td className='Payment'>
                                       <h2>
                                       <b>PKR{selectedBill.totalAmount}</b>
                                       </h2>
                                   </td>

                                   </tr>
                                   </tbody>
                                   </table>
                                   </div>
                               {/*  End Table */}
                               <div id='legalcopy'>
                                <p className='legal' >
                              <strong>Thank you for your order  </strong>
                                    please do Shopping again
                                   <b> umer12345@mail.com </b>
                                </p>
                                </div>
                               </div>
                             {/* End InvoiceBot */}
                               </div>

                           <div className='d-flex justify-content-end mt-3'>
                             <Button type='primary' onClick={handlePrint}>Print</Button>
                           </div>
                     

                                  </Modal>

     ) }
         </DefaultLayout>
  )
}

export default BillsPage