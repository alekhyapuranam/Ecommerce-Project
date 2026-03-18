import { ItemContainer } from "./itemcontainer";
import { UpdateQuantity } from "./updateQuantity";
export function OrderSummary({ checkoutItems, deliveryOptions, loadCartItems }) {
   
    

    return (
        <div className="order-summary">
            {
                checkoutItems.map((item) => {
                    console.log('delivery', deliveryOptions);
                    let deliveryDate = deliveryOptions.find((deliveryOption) => {

                        return deliveryOption.id === item.deliveryOptionId;

                    })
                    /*let deleteCartItem=async()=>{
                        await axios.delete(`api/cart-items/${item.productId}`);
                        loadCartItems();
        
                    }
                    let updateQuantityOfItem=()=>{
                        setEdit(true);
                        
                        
                    }*/
                    console.log("deliveryDate", deliveryDate);
                    return (
                      
                     
                          <ItemContainer  key={item.id} deliveryOptions={deliveryOptions} item={item} deliveryDate={deliveryDate} loadCartItems={loadCartItems}
                        UpdateQuantity={UpdateQuantity}/>
)
                    
                })
            }
        </div>

    )
}