import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./Homepage.css";
import { ProductsGrid } from "./productsGrid";
export function HomePage({ checkoutItems, setCheckoutItems }) {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    let fetchHomeData = async () => {
      let response = await axios.get('api/products');

      setProducts(response.data);


    };
    fetchHomeData();




  }, []);


  return (

    <>

      <Header checkoutItems={checkoutItems} />
      <ProductsGrid products={products} checkoutItems={checkoutItems} setCheckoutItems={setCheckoutItems} />





    </>



  )



}