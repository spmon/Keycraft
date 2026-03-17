import "./HighlightBanner.css";
import { Loader } from "../LoaderAnim/LoaderAnim";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export const HighLight = ({product}) => {
    return(
    <div className="banner-wrapper">
        {
            (product) ? 
            <div>
                <img src={product.images[0]}
                    alt = {product.name}
                />
                <div className="banner-overlays">
                    <div>
                        <h1>
                            {product.name}
                        </h1>
                    
                        {(product.discounted === 0) ?
                            (<h4><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat> <span> VND</span></h4>)  :   
                            ( <h4><span style={{textDecoration:"line-through", fontSize:"16px"}}><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat> </span>
                            <span style={{fontWeight:"900", marginInlineStart:"20px"}}>
                            <NumericFormat value={`${(product.price - product.discounted).toFixed(2)}`} displayType={"text"} thousandSeparator={true}></NumericFormat>
                            </span> <span> VND</span></h4>)
                        }
                        <Link to={`/product/${product._id}`}><button>Mua ngay</button> </Link>
                    </div>
                </div>
            </div>: <Loader/>
        }
        </div>
    );
}