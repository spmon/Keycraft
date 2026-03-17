import "./Cartmenu.css";
import { NumericFormat } from 'react-number-format';
import { useDispatchCart } from "../../Context/cart";

export const CartItem = ({product, quantity}) => {
    const cartDispatch = useDispatchCart();

    return(
        <div className="cart-item">
            <div className="cart-item-preview-and-delete">
                <button onClick={()=>{cartDispatch({type: "DELETE", product: product})}}>x</button>
                <img src={product.images[0]}
                alt={product.name}
                />
            </div>
            <div className="cart-item-desc">
                <h4>{product.name}</h4>
                {
                    (product.discounted === 0) ?
                        (<p><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat><span> VND</span></p>)  :   
                        ( <p><span style={{textDecoration:"line-through", fontSize:"10px", color:"grey"}}><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat> </span>
                        <span style={{color: "red",fontWeight:"900", marginInlineStart:"20px"}}>
                            <NumericFormat value={`${(product.price - product.discounted).toFixed(2)} $`} displayType={"text"} thousandSeparator={true}></NumericFormat>
                        </span><span> VND</span></p>)
                }
                <p><span style={{fontWeight:"700"}}>Số lượng: </span>{quantity}</p>
            </div>
        </div>
    );
}