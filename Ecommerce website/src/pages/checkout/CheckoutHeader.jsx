import { Link } from "react-router";
import { cartCount } from "../../utils/cartCount";
export function CheckoutHeader({ checkoutItems }) {

    return (

        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <a href="/">
                        <img className="logo" src="images/logo.png" />
                        <img className="mobile-logo" src="images/mobile-logo.png" />
                    </a>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">{cartCount(checkoutItems)} Items</Link>)
                </div>

                <div className="checkout-header-right-section">
                    <img src="images/icons/checkout-lock-icon.png" />
                </div>
            </div>
        </div>
    )
}