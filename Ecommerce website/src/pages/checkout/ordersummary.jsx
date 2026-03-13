import dayjs from "dayjs";
import { centsToDollars } from "../../utils/moneyconversion";
export function OrderSummary({ checkoutItems, deliveryOptions }) {

    return (
        <div className="order-summary">
            {
                checkoutItems.map((item) => {
                    console.log('delivery', deliveryOptions);
                    let deliveryDate = deliveryOptions.find((deliveryOption) => {

                        return deliveryOption.id === item.deliveryOptionId;

                    })
                    console.log("deliveryDate", deliveryDate);
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
                                    {deliveryOptions.map((option) => {
                                        let day = dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D');
                                        let shipping = 'FREE';
                                        if (option.priceCents != 0) {
                                            shipping = `$${centsToDollars(option.priceCents)} - `;
                                        }
                                        return (
                                            <div key={option.id} className="delivery-option">
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
                })
            }
        </div>

    )
}