
import React, { useContext } from "react";
import {Link} from "react-router-dom";
import {ShopContext} from "../../context/shop-context";


export const Product = (props)=>{
const {id, title, price,image} = props.data;
const {addToCart, cartItems} = useContext(ShopContext);

const cartItemAmount = cartItems[id];

    return (
        <div className="product">
            {<Link to={`/productDetails/${id}`}>
            <img src={image} ></img>
            </Link>}
            <div className="description">
                <p><b>{title}</b></p>
                <p>Rs {price}</p>
            </div>
            <button className="addToCartBttn" onClick={()=>addToCart(id)}>
                Add to cart {cartItemAmount>0 && <>{(cartItemAmount)}</>} </button>
                
        </div>
    )
}