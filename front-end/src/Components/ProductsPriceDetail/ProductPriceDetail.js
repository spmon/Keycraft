import Star_Icon from '../Assets/ic_star.png';
import { useState, useEffect } from 'react';
import "./ProductPriceDetail.css";
import { NumericFormat } from 'react-number-format';
import { useDispatchCart, useCart } from '../../Context/cart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import { PopUp } from '../PopUp/PopUp.js';



export const ProductPriceDetail = ({product}) =>{  
    const [quanity, setQuanity] = useState(1);
    const [message, setMessage] = useState("");
    const [launchPopUp, setLaunchPopUp] = useState(false);
    const dispatch = useDispatchCart();
    const cart = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = () => { 
        if(auth.user){
            setMessage("Đã thêm vào giỏ hàng!")
            setLaunchPopUp(true);
            dispatch({type:"ADD", product: product, quantity: quanity})
        } 
        else{
            setMessage("Xin vui lòng đăng nhập! Đang chuyển sang trang đăng nhập..."); 
            setLaunchPopUp(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }
    
    function increment(){
        if(quanity < product.stock){
            setQuanity(prevQuanity => prevQuanity + 1);
        }
    }

    function decrement(){
        if(quanity > 1){
            setQuanity(prevQuanity => prevQuanity - 1);
        }
    }

    return(
        <div className="product-detail-container">
            <PopUp message={message} trigger={launchPopUp} setTrigger={setLaunchPopUp}></PopUp>
            <div className="price-detail-wrapper">
                <h3>{product.name}</h3>
                <div>
                    {
                        (product.discounted === 0) ?
                            (<h4><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat><span> VND</span></h4>)  :   
                            ( <h4><span style={{textDecoration:"line-through", fontSize:"16px", color:"grey"}}><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat> </span>
                            <span style={{color: "red",fontWeight:"900", marginInlineStart:"20px"}}>
                                <NumericFormat value={`${(product.price - product.discounted).toFixed(2)} $`} displayType={"text"} thousandSeparator={true}></NumericFormat>
                            </span><span> VND</span></h4>)
                    }
                </div>

                

                <span style={{display:"flex", flexDirection:"row", height:"40px", alignItems:"center", gap:"20px"}}>
                    <img src={Star_Icon} alt="Star Reviews Rating"/>
                    <p>{product.rating}</p>
                </span>


                <p style={{marginTop:"20px", display:"flex", flexDirection:"row", justifyContent:"center", fontWeight:"900"}}>Số lượng đặt</p>
                {
                    (product.quanity === 0) ? <h5>Hết hàng!</h5> :
                    <div>
                        <div className="product-quanity-picker">
                            <button onClick={decrement}>&#8722;</button>
                            <p>{`${quanity}`}</p>
                            <button onClick={increment}>&#43;</button>
                        </div>
                        <button
                            onClick={handleAddToCart} 
                            style={{marginTop:"45px"}}
                        >   Thêm vào giỏ hàng
                        </button>
                   </div>
                }
            </div>
        </div>
    );

    

}