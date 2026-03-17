import { useEffect } from "react";
import { CartMenu } from "../Components/CartMenu/Cartmenu";
import { Footer } from "../Components/Footer/Footer";
import { useCart } from "../Context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";

// const Products_1 = [
//     {
//         name: "Logitech MX Business",
//         price: 149.99,
//         discounted: 0, 
//         imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg",
//         quanity: 2,
//     },
//     {
//         name: "Logitech MX Business as asjidja ijaisj iaj isj disaj diasjid jiasj diasjd ",
//         price: 149.99,
//         discounted: 0, 
//         imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg",
//         quanity: 1,
//     },
//     {
//         name: "Logitech MX Business",
//         price: 149.99,
//         discounted: 40, 
//         imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg",
//         quanity: 3,
//     },
//     {
//         name: "Q1-HE-launch-KS",
//         price: 149.99,
//         discounted: 40, 
//         imgsrc: "https://www.keychron.com/cdn/shop/files/Q1-HE-launch-KS.jpg",
//         quanity: 1,
//     },


// ];

export const Cart = () => {
    const cart = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(auth.user === null){
            navigate("/login");
        }
    },[])
    return(
        <div>
            <CartMenu products={cart}/>
            <Footer/>
        </div>
    );
}