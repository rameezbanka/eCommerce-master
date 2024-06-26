import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'; 
import './App.css';
import {Navbar} from "./components/navbar";
import {Shop} from "./pages/shop/shop";
import { ProductDetails } from './pages/productDetails';
import { ShopContextProvider } from './context/shop-context';
import CartPage from './components/CartPage';
import ProfilePage from './pages/profile/ProfilePage';
import Checkout from './pages/checkout/checkOut';



function App() {
 

  
  return (
    <div className="App">
      <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path = "/profile" element={<ProfilePage />} />
          <Route path="/productDetails/:id" element={<ProductDetails/>} />
         <Route  path='/checkout' element = {<Checkout/>}/>
        </Routes>
      </Router>
      </ShopContextProvider>
    </div>
  );
};

export default App;
