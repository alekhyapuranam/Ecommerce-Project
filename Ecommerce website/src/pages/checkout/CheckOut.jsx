import axios from "axios";
import { useEffect, useState } from "react";
import "./checkout-header.css";
import "./checkout.css";
import { CheckoutGrid } from "./checkoutgrid";
import { CheckoutHeader } from "./CheckoutHeader";
export function Checkout({ checkoutItems }) {

  let [deliveryOptions, setDeliveryOptions] = useState([]);
  let [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    let fetchAppData = async () => {
      let response = await axios.get('api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

      let responsePaymentSummary = await axios.get('api/payment-summary');

      setPaymentSummary(responsePaymentSummary.data);


    };
    fetchAppData();



  }, [])

  console.log(paymentSummary);

  return (
    <>
    <CheckoutHeader checkoutItems={checkoutItems}/>
    
      <CheckoutGrid checkoutItems={checkoutItems} deliveryOptions={deliveryOptions} paymentSummary={paymentSummary}/>
      

    </>


  );
}