
import { React, useState, useEffect } from "react";
import "./checkout.css";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const result = JSON.parse(localStorage.getItem('userData'));
    const [orderSuccess, setOrderSuccess] = useState(false);

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
    }, []);
    useEffect(() => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.quantity * item.price;
        });
        setTotalAmount(total);
    }, [cartItems]);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };



    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <form className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="phoneNumber" id="phoneNumber" name="phoneNumber" value={phoneNumber}  onChange={handlePhoneNumberChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea type="text" id="address" name="address" value={address} onChange={handleAddressChange} required />
                </div>
                <div className="payment-section">
                    <h2>Payment Type</h2>
                    <div className="payment-methods">
                        <label>
                            <input type="radio" name="paymentMethod" value="GooglePay" required />
                            GooglePay
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="Credit Card" required/>
                            Creditr Card
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="cashOnDeliver" required/>
                            Cash on Delivery
                        </label>
                    </div>
                </div>

                <button type="submit" className="checkout-btn">Place Order</button>
            </form>
            {orderSuccess && (
                <div className="order-success-dialog">
                    <p>Order Successful!</p>
                </div>
            )}
            <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="order-items">
                    <div className="order-item">
                        <span>Product Name</span>
                        <span>Quantity</span>
                        <span>Price</span>
                    </div>
                    {cartItems.map(item => (
                        <div className="order-item" key={item.id}>
                            <span>{item.title}</span>
                            <span>{item.quantity}</span>
                            <span>{item.quantity * item.price}</span>
                        </div>

                    ))}
                    <div className="total-amount">
                        <h3>Total Amount:</h3>
                        <p>Rs {totalAmount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
