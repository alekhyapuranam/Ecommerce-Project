import axios from "axios";
import { useNavigate } from "react-router";
import { centsToDollars } from "../../utils/moneyconversion";
export function PaymentSummary({ paymentSummary,loadCartItems }) {
    let navigate=useNavigate();
    let orderItems=async()=>{
      await  axios.post('api/orders');
      await loadCartItems();

        navigate('/orders');
    }

    return (

        <div className="payment-summary">
            {paymentSummary &&
                <>
                    <div className="payment-summary-title">
                        Payment Summary
                    </div>

                    <div className="payment-summary-row">
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">${centsToDollars(paymentSummary.productCostCents)}</div>
                    </div>

                    <div className="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">${centsToDollars(paymentSummary.shippingCostCents)}</div>
                    </div>

                    <div className="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">${centsToDollars(paymentSummary.totalCostBeforeTaxCents)}</div>
                    </div>

                    <div className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">${centsToDollars(paymentSummary.taxCents)}</div>
                    </div>

                    <div className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">${centsToDollars(paymentSummary.totalCostCents)}</div>
                    </div>

                    <button className="place-order-button button-primary" onClick={orderItems}>
                        Place your order
                    </button>
                </>
            }

        </div>
    )
}