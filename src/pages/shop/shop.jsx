import React, { useContext } from "react";
import { Product } from "./product";
import "./shop.css";
import { ShopContext } from "../../context/shop-context";


export const Shop = () => {
    const { PRODUCTS } = useContext(ShopContext);
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>eCommerce</h1>
            </div>
            <div className="products">
                {PRODUCTS.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};