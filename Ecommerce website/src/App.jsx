import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import { Checkout } from './pages/checkout/CheckOut'
import { HomePage } from './pages/Homepage/Homepage'
import { Orders } from './pages/orders/Orders'

function App() {
  const [checkoutItems, setCheckoutItems] = useState([]);
  useEffect(() => {
    let fetchCartData = async () => {
      let response = await axios.get('api/cart-items?expand=product')
      setCheckoutItems(response.data);
    };
    fetchCartData();

  }, []);


  return (
    <>
      <Routes>
        <Route index element={<HomePage checkoutItems={checkoutItems} setCheckoutItems={setCheckoutItems} />} />
        <Route path="checkout" element={checkoutItems && <Checkout checkoutItems={checkoutItems} />} />
        <Route path="orders" element={checkoutItems && <Orders checkoutItems={checkoutItems} />} />

      </Routes>
    </>
  )
}

export default App
