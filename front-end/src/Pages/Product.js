import { ProductPictures } from "../Components/ProductPictures/ProductPictures";
import { ProductPriceDetail } from "../Components/ProductsPriceDetail/ProductPriceDetail"; 
import { Specification } from "../Components/Specification/SpecificationBox";
import { Footer } from "../Components/Footer/Footer";
import { useParams } from 'react-router-dom';
import { ProductApi } from "../Api/product";
import { useEffect, useState } from "react";
import { Loader } from "../Components/LoaderAnim/LoaderAnim";
import { useAuth } from "../Context/auth.js";

// const Products_2 = [
//     {
//         name: "Fuhlen Yellow Pro",
//         price: 2.99,
//         discounted: 2.09,
//         imgsrc: [
//             "https://fuhlen.vn/wp-content/uploads/2022/09/web1.jpg",
//             "https://fuhlen.vn/wp-content/uploads/2022/09/web1.jpg",
//         ],
//         rating: 4.3, 
//         quanity: 9,
//         description: "blah blah blah blah",
//         specs:{
//             manufacturer: "Fuhlen",
//             switch_type: "Yellow",
//             actuation_force: 20,
//         },
//     },
// ];

export const ProductPage = () => {
    const { productID } = useParams();
    const productApi = new ProductApi();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        productApi.getProductById(productID).then(
            res =>{
                setProduct(res.data);
            }
        ).catch(err => {
            console.log(err);
        })
    }, [])
   
    return(
        <div>
            {
                (product === null) ? 
                <div style={{
                    width: "100vw",
                    height: "80vh"
                }}>
                    <Loader/> 
                </div> :
                 <div style={{
                    paddingInline: "40px",
                    marginTop:"50px",
                }}
                >
                    <div style={{
                        display: "grid",
                        gridTemplateColumns:"2fr 1fr",
                        columnGap: "40px",
                    }}>
                        <div>
                            {
                                (product.images.length === 0) ? <div>Không tìm thấy ảnh</div>:<ProductPictures pictures={product.images} /> 
                            }
                            <div style={{padding:"30px"}}>
                                <h4>Mô tả</h4>
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div>
                            <ProductPriceDetail product={product}/>
                            <Specification specs={product.specs} category={product.category} />
                        </div>
                    </div>
                </div>
            }           
            <Footer />
        </div>
    );
}