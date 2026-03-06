
import { Route, Routes } from 'react-router'
import './App.css'
import { Checkout } from './pages/CheckOut'
import { HomePage } from './pages/Homepage'
import { Orders } from './pages/Orders'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="orders" element={<Orders/>}/>
       
   </Routes>
    </>
  )
}

export default App
