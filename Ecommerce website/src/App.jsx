import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import { Checkout } from './pages/CheckOut'
import { HomePage } from './pages/Homepage'
import { Orders } from './pages/Orders'

function App() {
   const [checkoutItems, setCheckoutItems]=useState([]);
  useEffect(()=>{
    axios.get('api/cart-items?expand=product').
    then((response)=>{
       console.log(response.data);
        setCheckoutItems(response.data);
        console.log(checkoutItems);
    })
  },[]);


  return (
    <>
    <Routes>
      <Route index element={<HomePage checkoutItems={checkoutItems}/>}/>
      <Route path="checkout" element={checkoutItems&& <Checkout checkoutItems={checkoutItems}/>}/>
      <Route path="orders" element={checkoutItems && <Orders checkoutItems={checkoutItems}/>}/>
       
   </Routes>
    </>
  )
}

export default App
