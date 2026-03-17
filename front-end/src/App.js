import './App.css';
import {NavBar} from './Components/NavBar/Navbar.js';
import {Home} from './Pages/Home.js';
import {LoginSignUp} from './Pages/LoginSignup.js';
import { Category } from './Pages/Category.js';
import { ProductPage } from './Pages/Product.js';
import { Cart } from './Pages/Cart.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ScrollToTop } from './Context/scrollToTop.js';
import { AssisstantChat } from "./Components/AssistantChat/AssisstantChat.js";


function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <AssisstantChat />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginSignUp/>} />
          <Route path="/keyboard" element={<Category category={"keyboard"}/>}/>
          <Route path="/switch" element={<Category category={"switch"}/>}/>
          <Route path="/keycap" element={<Category category={"keycap"}/>}/>
          <Route path="/product" element={<ProductPage/>}>
            <Route path=":productID" element={<ProductPage/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;