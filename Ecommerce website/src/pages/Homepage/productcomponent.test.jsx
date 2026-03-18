import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { ProductComponent } from "./productcomponent";

vi.mock('axios',()=>({
    default:{
        post : vi.fn(),
        get : vi.fn()
    }
}));


describe('test component render on screen', () => {
    let product={
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            }
let loadCartItems=vi.fn();
    it('expects data from backend', async () => {
        axios.get.mockResolvedValue({
            data: [{
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                image: "images/products/intermediate-composite-basketball.jpg",
                name: "Intermediate Size Basketball",
                rating: {
                    stars: 4,
                    count: 127
                },
                priceCents: 2095,
                keywords: ["sports", "basketballs"]
            }]
        })
    })
    it('test calling backend with correct request',async()=>{
     await render(<ProductComponent product={product} loadCartItems={loadCartItems}/>)
        let button=screen.getByText("Add to Cart");
        fireEvent.click(button);
        expect(axios.post).toHaveBeenCalledWith('/api/cart-items',{
            "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "quantity": 1 
        })
        
    })
    it('test rendering product correctly on screen', async()=>{
        await render(<ProductComponent product={product} loadCartItems={loadCartItems}/>)
        let button = screen.getByText("Add to Cart");
        fireEvent.click(button);
        let productName = screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(productName).toBeInTheDocument;
        expect(screen.getByText("10.90")).toBeInTheDocument;
        expect(screen.getByTestId("test-product-image")).toHaveAttribute('src',"images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(screen.getByTestId("test-image")).toHaveAttribute("src","images/ratings/rating-45.png");

    })

})