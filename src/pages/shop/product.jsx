
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";


export const Product = (props) => {
    const { id, title, price, image } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext);
    const [isInCart, setIsInCart] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userData'));
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    useState(() => {
        setIsInCart(cartItems.some((item) => item.id === id));
    }, [cartItems, id]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            setShowLoginMessage(true);
            return;
        }

        await addToCart(id);
        setIsInCart(true); 
    };

    return (
        <div className="product">
            {<Link to={`/productDetails/${id}`}>
                <img src={image} alt="Image not found"></img>
            </Link>}
            <div className="description">
                <p><b>{title}</b></p>
                <p>Rs {price}</p>
            </div>
            {isLoggedIn ? (
                isInCart ? (
                    <button className="addedToCartBttn" disabled>Added to cart</button>
                ) : (
                    <button className="addToCartBttn" onClick={handleAddToCart}>Add to cart</button>
                )
            ) : (
                <>
                    <button className="addToCartBttn" onClick={handleAddToCart}>Add to cart</button>
                    {showLoginMessage && (
                        <p>You must log in before adding to cart.</p>
                    )}
                </>
            )}
            {showLoginMessage && setTimeout(() => {
                window.location.reload();
            }, 1000)}

        </div>
    )
}