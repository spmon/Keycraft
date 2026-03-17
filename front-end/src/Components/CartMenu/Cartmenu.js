import "./Cartmenu.css";
import { CartItem } from "./CartItem";
import { NumericFormat } from 'react-number-format';


export const CartMenu = ({products}) => {
    const calc_total_item = () =>{
        var total = 0; 
        for (const [key, value] of Object.entries(products)){
            total += value.product.price * value.quantity
        }
        return total; 
    }

    var total = calc_total_item();
    return(
        <div className="cart-menu-container">
            <h1>Cart</h1>
            <div className="cart-menu-items">
                {
                    (products) ? 
                    products.map((cartItem)=>{
                        return <CartItem product={cartItem.product} quantity={cartItem.quantity}/>;
                    }) :
                    <div> "Không có sản phẩm trong xe!" </div>
                }
            </div>
            <div className="line-divider"> </div>
            <div className="total-and-ship-address">
                <div>
                    <p>Địa chỉ...</p>
                    <p><span>Tổng tiền: </span> <NumericFormat style={{fontWeight:"900", color:"red"}} value={`${total}`} displayType={"text"} thousandSeparator={true}></NumericFormat> <span> VND</span></p>
                </div>
                <button>Thanh toán</button>
            </div>
        </div>
    );
}