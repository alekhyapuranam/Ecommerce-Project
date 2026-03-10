import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { centsToDollars } from "../utils/moneyconversion";
import "./checkout-header.css";
import "./checkout.css";
export function Checkout({checkoutItems}){
 
      let [deliveryOptions, setDeliveryOptions]=useState([]);
      useEffect(()=>{
        axios.get('api/delivery-options?expand=estimatedDeliveryTime').
      then((response)=>{
        setDeliveryOptions(response.data);
      })
      },[])
      

    return(
        <>
         <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <a href="/">
            <img className="logo" src="images/logo.png" />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </a>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<a className="return-to-home-link"
            href="/">3 items</a>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">
         {
          checkoutItems.map((item)=>{
            return(
               <div  key ={item.id} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={item.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {item.product.name}
                </div>
                <div className="product-price">
                  {centsToDollars(item.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{item.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((option)=>{
                  let day= dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D');
                  let shipping='FREE';
                  if(option.priceCents!=0){
                    shipping=`$${centsToDollars(option.priceCents)} - `;
                  }
                  return(
                    <div key ={option.id} className="delivery-option">
                  <input type="radio" checked={item.deliveryOptionId===option.id}
                    className="delivery-option-input"
                    name={`delivery-option-${item.productId}`} />
                  <div>
                    <div className="delivery-option-date">
                      {day}
                    </div>
                    <div className="delivery-option-price">
                     {shipping} Shipping
                    </div>
                  </div>
                </div>

                  )
                  

                })}
                
              </div>
            </div>
          </div>

         

            )
          })
        }
        </div>

        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
        </div>
      </div>
    </div>
        
        </>


    );
}