import { OrderSummary } from "./ordersummary";
import { PaymentSummary } from "./paymentsummary";
export function CheckoutGrid({ checkoutItems, deliveryOptions, paymentSummary, loadCartItems }) {

    return (

        <div className="checkout-page">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
                <OrderSummary checkoutItems={checkoutItems} deliveryOptions={deliveryOptions} loadCartItems={loadCartItems} />
                
                <PaymentSummary paymentSummary={paymentSummary} loadCartItems={loadCartItems} />
                
            </div>
        </div>
    )
}