
import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {

  const [PRODUCTS, setPRODUCTS] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPRODUCTS(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);


  const addToCart = async (itemId) => {
    try {

      const result = JSON.parse(localStorage.getItem('userData'));
      if (!result || !result.email) {
          console.error("User is not logged in");
          // Handle the case where user is not logged in
          return;
      }

      const selectedProduct = PRODUCTS.find(product => product.id === itemId);
      if (selectedProduct) {
          const response = await fetch("http://localhost:8080/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: selectedProduct.id,
            title: selectedProduct.title,
            description: selectedProduct.description,
            price: selectedProduct.price,
            image: selectedProduct.image,
            userId: result.email,

          })
        });

        if (response.ok) {
          console.log("Item added to cart successfully");
          console.log(result.email);
        } else {
          console.error("Failed to add item to cart");
        }
        
      } else {
        console.error("Selected product not found");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };



  //console.log("ContextValue:", ContextValue);
  const ContextValue = { PRODUCTS, cartItems, addToCart };

  return (
    <ShopContext.Provider value={ContextValue}>{children}</ShopContext.Provider>
  );
};