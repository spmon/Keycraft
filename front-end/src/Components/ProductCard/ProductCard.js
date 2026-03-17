import React from "react";
import "./ProductCard.css";
import {Link} from "react-router-dom";
import { NumericFormat } from 'react-number-format';

export const ProductCard = ({product}) =>{
    let textFontStyle = (product.name.length <= 40) ? 20 : (product.name.length >= 100) ? 11 : 14

    return(
        <Link to={`/product/${product._id}`}>
            <div className="prodcard-wrapper" 
                >
                <div className="prodcard-img">
                    <img src={product.images[0]}
                        alt={product.name} 
                    />
                </div>
                <div className="prodcard-desc-wrapper">
                    <h4  style={{fontSize:`${textFontStyle}px`}}>
                        {product.name}
                    </h4>

                    { (product.discounted === 0) ?
                        (<NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat>)  :   
                        ( <p><span style={{textDecoration:"line-through", fontSize:"10px", color:"grey"}}><NumericFormat value={`${product.price}`} displayType={"text"} thousandSeparator={true}></NumericFormat></span>
                            <span style={{color:"red", fontWeight:"900"}}><NumericFormat value={`${(product.price - product.discounted).toFixed(2)}`} displayType={"text"} thousandSeparator={true}></NumericFormat>
                            </span></p>)
                    }
                    <span> VND</span>
                </div>
            </div>
        </Link>
    );
}