import axios from "axios";
import { useState } from "react";

export function UpdateQuantity({quantity, productId,deliveryOptionId, setEdit, deleteCartItem, loadCartItems}){
   let [input, setInput]= useState(quantity);
   let saveQuantity=async()=>{
    let quantityToUpdate=Number(input);
    await axios.put(`api/cart-items/${productId}`,
        
    {
        "quantity" : quantityToUpdate,
        "deliveryOptionId" : deliveryOptionId
    })
    setEdit(false);
    loadCartItems();
   }
   

    return (
        <span>
        <span>
            <label>
                Quantity : 
            <input  className="update-quantity" type="number" onChange={(event)=>{setInput(event.target.value)} } value={input} ></input>
            </label></span>
        <span className="link-primary" onClick={saveQuantity}>Save</span>
        <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                                            Delete 
                                        </span>
        </span>
        
        
    )

}