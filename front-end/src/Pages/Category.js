import React, { useContext } from "react";
import { ProductCard } from "../Components/ProductCard/ProductCard";
import { Footer } from "../Components/Footer/Footer";
import "./Category.css";
import { ProductApi } from "../Api/product";
import { useState, useEffect } from "react";
import { Loader } from "../Components/LoaderAnim/LoaderAnim";
// const Products_1 = [
//     {
//         name: "Logitech MX Business",
//         price: 149.99,
//         discounted: 0, 
//         imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg"
//     },
//     {
//         name: "Logitech MX Business as asjidja ijaisj iaj isj disaj diasjid jiasj diasjd ",
//         price: 149.99,
//         discounted: 0, 
//         imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg"
//     },
//     {
//         name: "Logitech MX Business",
//         price: 149.99,
//         discounted: 40, 
//         imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg"
//     },
//     {
//         name: "Q1-HE-launch-KS",
//         price: 149.99,
//         discounted: 40, 
//         imgsrc: "https://www.keychron.com/cdn/shop/files/Q1-HE-launch-KS.jpg"
//     },


// ];

export const Category = ({category}) =>  {
    const [products, setProducts] = useState([]);
    const productApi = new ProductApi(); 
    
    useEffect(()=>{
        setProducts([]);
        productApi.getProductsByCategory(category).then(
            res =>{
                setProducts(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    },[category])
   
    return(
        <div>
            <div className="category-container">
                <div className="category-left">
                    <div className="category-filter-options">
                        <h3>Bộ lọc</h3>
                        <a>Lọc bằng giá tiền</a>
                        <a>Lọc bằng từ điển</a>
                    </div>
                </div>
                <div className="category-right">
                    {
                        (products.length === 0) ? <Loader/>:
                        <div className="category-items">
                        {products.map((product) => {
                            return <ProductCard product={product}/>;
                        })}
                    </div>
                    }
                    
                    {/* <div className="category-page-change">
                        <div className="category-page-control">
                            <p>&lt;</p>
                            <p>1 / 2</p> 
                            <p>&gt;</p>
                        </div>
                    </div> */}
                </div>  
            
            </div>
            <Footer />
        </div>
    );
}