import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../../components/Header";
import "./tracking.css";
export function Tracking({checkoutItems}){

  const {orderId, productId}=useParams();
  let [orderTracking,setOrderTracking]=useState({});
  //let [deliveryProgress, setDeliveryProgress]=useState();
  
  
  console.log("type",typeof orderId);
  useEffect(()=>{
    let fetchOrderDetails=async()=>{
     let response =  await axios.get(`api/orders/${orderId}?expand=products`);
   let data = response.data;

     setOrderTracking(data);
    
    }
    fetchOrderDetails();
    
 
  },[orderId]);
  // console.log(orderTracking.products);
   let productDetails;
   let deliveryProgress;
   let isPreparing;
   let isShipping;
   let isDelivered;
     if(orderTracking.products){
      let productsArray = orderTracking.products;
      productDetails=productsArray.find((product)=>{
        console.log(product);
        return product.productId===productId;
   });
     console.log(productDetails);
     let orderTime=orderTracking.orderTimeMs;
     let estimatedDeliveryTime=productDetails.estimatedDeliveryTimeMs;
     let totalDeliveryTime=estimatedDeliveryTime-orderTime;
     let timePassed=dayjs().valueOf() -orderTime;
     deliveryProgress= (timePassed/totalDeliveryTime)*100;
     isPreparing= (deliveryProgress<=33);
     isShipping=(deliveryProgress>33 && deliveryProgress<100);
     isDelivered=(deliveryProgress>=100);

     //setOrderTracking({});
   } 
   
     
 // console.log(orderDetails.products);
 // let productsArray=orderDetails.products;
 // let productDetails=productsArray.find((product)=>{
 //     product.productId===productId
 // });
  //  console.log(productDetails);

    return(
      productDetails && (
        <>
          <Header checkoutItems={checkoutItems}/>

    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          Arriving on {dayjs(productDetails.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="product-info">
          {productDetails.product.name}
        </div>

        <div className="product-info">
          Quantity: {productDetails.quantity}
        </div>

        <img className="product-image" src={productDetails.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing&& 'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipping && 'current-status'}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width : `${deliveryProgress}%`}}></div>
        </div>
      </div>
    </div>
        </>
      )
    
      
        
    );
}