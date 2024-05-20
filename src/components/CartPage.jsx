
import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Link } from "react-router-dom";

const CartPage = () => {

    const [cartItems, setCartItems] = useState([]);

    const result = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        const fetchCartItems = async () => {
            try {

                const userId = result?.email;
                if (!userId) {
                    console.log("User is not loggedIn");
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/products?userId=${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    },[]);

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
            const userId = result?.email;
            const response = await fetch(`http://localhost:8080/api/cart/${itemId}?quantity=${quantity}&userId=${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Item quantity updated successfully");
                const updatedCartItems = cartItems.map(item => {
                    if (item.id === itemId) {
                        return { ...item, quantity: item.quantity + quantity };
                    }
                    return item;
                });
                setCartItems(updatedCartItems);
            } else {
                console.error("Failed to update item quantity");
            }
        } catch (error) {
            console.error("Error updating item quantity:", error);
        }
    };
    const truncateString = (str, numWords) => {
        const words = str.split(' ');
        if (words.length > numWords) {
            return words.slice(0, numWords).join(' ') + '...';
        }
        return str;
    };

    console.log("cart", cartItems);
    return (
        <div>
            <h1>Your Cart</h1>
            <div className="cart-actions">
            {cartItems.some(item => item.quantity > 0) && (
                    <Link to={{pathname:"/checkout", state: { cartItems: cartItems } }} className="btn-1">CheckOut</Link>
                )}
            </div>
            {result?.email ?  (
                cartItems.filter(item => item.quantity > 0).length > 0 ? (
                    cartItems.filter(item=>item.quantity>0).map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div className="item-details">
                                <Link to={`/productDetails/${item.id}`}>
                                    <img src={item.image} alt={item.title} />
                                </Link>
                                <p className="item-title">{truncateString(item.title, 2)}</p>
                                <p className="item-description">{truncateString(item.description, 5)}</p>
                            </div>
                            <div className="item-price">Rs {(item.price) * item.quantity}</div>
                            <div className="item-quantity">
                                <button className="quantity-btn" onClick={() => updateCartItemQuantity(item.id, -1)}>-</button>
                                <p className="quantity-value">{item.quantity}</p>
                                <button className="quantity-btn" onClick={() => updateCartItemQuantity(item.id, 1)}>+</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p><h1>Your cart is empty</h1></p>
                )
            ) : (
                <p>You need to login first</p>
            )}
        </div>
    );
};
export default CartPage;
