import React, { useContext, useState } from "react";
import { Product } from "./product";
import "./shop.css";
import { ShopContext } from "../../context/shop-context";
import SearchIcon from '@mui/icons-material/Search';


export const Shop = () => {
    const { PRODUCTS } = useContext(ShopContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [filterOption, setFilterOption] = useState([]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleSearchSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/search?query=${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error("Failed to fetch search results");
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    const handleCategoryClick = (category) => {
        const filteredProducts = PRODUCTS.filter(product => product.category.toLowerCase() === category.toLowerCase());
        setFilterOption(filteredProducts);
    };

    
    const handleExploreClick = (type) => {
        switch (type) {
            case 'newArrivals':
                const currentDate = new Date();
                const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                const newProducts = PRODUCTS.filter(product => new Date(product.addedDate) >= oneWeekAgo);
                setFilterOption(newProducts);
                console.log("new arivals",filterOption);
                break;
            case 'offers':
                //logic 
                console.log("offers");
                break;
            case 'gift':
                //logic
                console.log("gifts");
                break;
            case 'bestSelling':
                //logic
                console.log("bestSelling");
                break;
            default:
                break;
        }
    };



    return (
        <div className="shop">
            <div className="shop-items">
                <div className="right-links">
                    <div className="search-bar"><input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange}></input>
                        <SearchIcon onClick={handleSearchSubmit} />
                    </div>
                    <div className="category">Category: </div>
                    <div>
                        <ul className="options" onClick={() => handleCategoryClick('electronics')}>Electronics</ul>
                        <ul className="options" onClick={() => handleCategoryClick('clothing')}>Clothing</ul>
                        <ul className="options" onClick={() => handleCategoryClick('jewellary')}>Jewelary</ul>
                        <ul className="options" onClick={() => handleCategoryClick('grocery')}>Grocery</ul>
                        <ul className="options" onClick={() => setFilterOption([])}>Show All</ul>
                    </div>
                    <div className="category"> Explore Further:</div>
                    <div>
                        <ul className="options" onClick={() => handleExploreClick('newArrivals')}>New Arrivals</ul>
                        <ul className="options" onClick={() => handleExploreClick('offers')}>Specail Offers</ul>
                        <ul className="options" onClick={() => handleExploreClick('gift')}>Gift ideas</ul>
                        <ul className="options" onClick={() => handleExploreClick('bestSelling')}>Best Sellers</ul>
                        <ul className="options" onClick={() => setFilterOption([])}>Show All</ul>
                    </div>
                </div>
                <div className="products">
                    {searchQuery ? (
                        searchResults.map((product) => (
                            <Product key={product.id} data={product} />
                        ))
                    ) : (
                        filterOption.length > 0 ? (
                            filterOption.map((product) => (
                                <Product key={product.id} data={product} />
                            ))
                        ) : (
                            PRODUCTS.map((product) => (
                                <Product key={product.id} data={product} />
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
