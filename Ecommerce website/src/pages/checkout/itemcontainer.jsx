import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { centsToDollars } from "../../utils/moneyconversion";
export function ItemContainer({deliveryOptions,item,loadCartItems, deliveryDate, UpdateQuantity}){
     let [edit,setEdit] = useState(false);
     let deleteCartItem=async()=>{
                        await axios.delete(`api/cart-items/${item.productId}`);
                        loadCartItems();
        
                    }
                    let updateQuantityOfItem=()=>{
                        setEdit(true);
                        
                        
                    }

    return (
         <div key={item.id} className="cart-item-container">
                            
                            <div className="delivery-date">
                                Delivery date: {deliveryDate && dayjs(deliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
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
                                        {edit?<UpdateQuantity quantity={item.quantity} 
                                        productId={item.productId} deliveryOptionId={item.deliveryOptionId} setEdit={setEdit}
                                        deleteCartItem={deleteCartItem} loadCartItems={loadCartItems}/>:
                                         <>
                                         <span>
                                            Quantity: <span className="quantity-label">{item.quantity}</span>
                                        </span>
                                        <span className="update-quantity-link link-primary" onClick={updateQuantityOfItem}>
                                            Update
                                        </span>
                                        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                            Delete 
                                        </span>
                                        </>
                }
                                       
                                    </div>
                                </div>

                                <div className="delivery-options">
                                    <div className="delivery-options-title">
                                        Choose a delivery option:
                                    </div>
                                    {deliveryOptions.map((option) => {
                                        let day = dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D');
                                        let shipping = 'FREE';
                                        if (option.priceCents != 0) {
                                            shipping = `$${centsToDollars(option.priceCents)} - `;
                                        }
                                        let updateDeliveryOption= async()=>{
                                            await axios.put(`/api/cart-items/${item.productId}`,
                                            {
                                                "quantity" : item.quantity,
                                                "deliveryOptionId" : option.id
                                            });
                                            loadCartItems();


                                        }
                                        return (
                                            <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
                                                <input type="radio" checked={item.deliveryOptionId === option.id}
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
}