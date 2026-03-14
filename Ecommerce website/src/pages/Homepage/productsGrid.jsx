//import axios from "axios";
//import { useEffect } from "react";
//import { useEffect } from "react";
import { ProductComponent } from "./productcomponent";
export function ProductsGrid({ products, setCheckoutItems,loadCartItems}) {






    return (
        <div className="home-page">


            <div className="products-grid">
                {
                    products.map((product) => {

                        return (
                            <ProductComponent key={product.id} product={product} setCheckoutItems={setCheckoutItems} loadCartItems={loadCartItems} />


                        )
                    })


                }

            </div>

        </div>

    )
}