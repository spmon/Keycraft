import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import './ProductHorizontal.css';

export const ProductHorizontal = ({categoryName, products, category}) => {
        

    return(
        <div className="productscroll-wrapper">
            <div className="categoryname-header">
                <h1>{categoryName}</h1>
                <Link to={`/${category}`}>
                    <button>
                        Xem thêm
                    </button>
                </Link>
            </div>

            <div className="productscard-wrapper"> 
                {products.map((product) => (
                        <div style={{marginBottom:"20px"}}>
                            <ProductCard product={product}/>
                        </div>
                ))}
            </div>        
        </div>
    );
}