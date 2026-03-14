import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import { Checkout } from './pages/checkout/CheckOut'
import { HomePage } from './pages/Homepage/Homepage'
import { Orders } from './pages/orders/Orders'

function App() {
  const [checkoutItems, setCheckoutItems] = useState([]);
   let loadCartItems = async () => {
      let response = await axios.get('api/cart-items?expand=product')
      setCheckoutItems(response.data);
    };
  useEffect(() => {
    
    loadCartItems();

  },[]);


  return (
    <>
      <Routes>
        <Route index element={<HomePage checkoutItems={checkoutItems} setCheckoutItems={setCheckoutItems} loadCartItems={loadCartItems} />} />
        <Route path="checkout" element={checkoutItems && <Checkout checkoutItems={checkoutItems} loadCartItems={loadCartItems}/>} />
        <Route path="orders" element={checkoutItems && <Orders checkoutItems={checkoutItems} />} />

      </Routes>
    </>
  )
}

export default App
