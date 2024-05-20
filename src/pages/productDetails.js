import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context"


export const ProductDetails = (props)=>{

  const { id } = useParams(); 
  const { PRODUCTS } = useContext(ShopContext);

 const product = PRODUCTS.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div><h2>Product not found</h2></div>;
  }
   
return (
    <div >
      <div className="product">
      <img src={product.image}  />
      <h2>{product.title}</h2>
      <p>Price: Rs {product.price}</p>
      </div>
     <h5>{product.description}</h5>
    
  </div>
  

    );
};