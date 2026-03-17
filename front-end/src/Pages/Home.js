import React from "react";
import { Hero } from "../Components/Hero/Hero.js";
import { Services } from "../Components/ServicesSection/Services.js";
import { Category } from "../Components/CategoriesSection/Category.js";
import { ProductHorizontal } from "../Components/ProductHorizontalScroll/ProductHorizontal.js";
import { HighLight } from "../Components/HighlightBanner/HighlightBanner.js";
import { FollowSocial } from "../Components/FollowSocial/FollowSocial.js";
import { Footer } from "../Components/Footer/Footer.js";
import { useState } from "react";
import { ProductApi } from "../Api/product.js";
import { useEffect } from "react";

const slides =[
    {
        imgsrc: 'https://media.karousell.com/media/photos/products/2023/2/23/epomaker_th96_wireless_mechani_1677162391_e98bc650_progressive.jpg',
        name: 'Bàn phím cơ không dây Epomaker TH96',
        link: '/keyboard'
    },

    {
        imgsrc: 'https://bizweb.dktcdn.net/100/438/322/products/pvd-gold-1680715964999.png',
        name: 'Bàn phím Zoom75 Special Edition - Case EWhite',
        link: '/keyboard'
    },

    {
        imgsrc: 'https://keebsforall.com/cdn/shop/files/DSC08434.jpg',
        name: 'Bàn phím Chilkey PAW65 Barebone Edition',
        link: '/keyboard'
    }
];

const KeyboardCategories = [
    {
        imgsrc: 'https://cdn.vox-cdn.com/thumbor/FoOkMjfNxrfXfGuyVSCfNlEcHdI=/0x0:2040x1360/2040x1360/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24055266/226317_Mechanical_Keyboard_Buying_Guide_JPorter_0011.jpg',
        name: 'Bàn phím cơ',
        link: '/keyboard'
    },
    {
        imgsrc: 'https://m.media-amazon.com/images/I/81EuIEh0a7L._AC_UF894,1000_QL80_.jpg',
        name: 'Bàn phím văn phòng',
        link: '/keyboard'
    },
    {
        imgsrc: 'https://m.media-amazon.com/images/I/61O-Y9WaORL._AC_UF350,350_QL80_.jpg',
        name: 'Bàn phím giả cơ',
        link: '/keyboard'
    },
];

const Products_1 = [
    {
        name: "Logitech MX Business",
        price: 149.99,
        discounted: 0, 
        images:[
            "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg"
        ]
    },
    {
        name: "Logitech MX Business as asjidja ijaisj iaj isj disaj diasjid jiasj diasjd ",
        price: 149.99,
        discounted: 0, 
        imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg"
    },
    {
        name: "Logitech MX Business",
        price: 149.99,
        discounted: 40, 
        imgsrc: "https://www.officechoice.com.au/images/ProductImages/500/2975976.jpg"
    },
    {
        name: "Q1-HE-launch-KS",
        price: 149.99,
        discounted: 40, 
        imgsrc: "https://www.keychron.com/cdn/shop/files/Q1-HE-launch-KS.jpg"
    },


];

// const Products_2 = [
//     {
//         name: "Fuhlen Yellow Pro",
//         price: 2.99,
//         discounted: 0,
//         imgsrc: "https://fuhlen.vn/wp-content/uploads/2022/09/web1.jpg"
//     },
//     {
//         name: "Fuhlen Yellow Pro",
//         price: 2.99,
//         discounted: 0,
//         imgsrc: "https://fuhlen.vn/wp-content/uploads/2022/09/web1.jpg"
//     },
//     {
//         name: "Fuhlen Yellow Pro",
//         price: 2.99,
//         discounted: 0,
//         imgsrc: "https://fuhlen.vn/wp-content/uploads/2022/09/web1.jpg"
//     },
//     {
//         name: "Fuhlen Yellow Pro",
//         price: 2.99,
//         discounted: 0,
//         imgsrc: "https://fuhlen.vn/wp-content/uploads/2022/09/web1.jpg"
//     },
// ];


export const Home = () => {
    const [products_1, setProducts_1] = useState([]);
    const [products_2, setProducts_2] = useState([]);
    const [products_3, setProducts_3] = useState([]);

    const productApi = new ProductApi(); 
    
    useEffect(() => {
        productApi.getProductsByCategory('keyboard').then(
            res =>{
                setProducts_1(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    
        productApi.getProductsByCategory('switch').then(
            res =>{
                setProducts_2(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    
        productApi.getProductsByCategory('keycap').then(
            res =>{
                setProducts_3(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    },[])  

    return(
        <div>
            <Hero slides={slides} />
            <Services /> 
            <Category categoryName="Loại bàn phím" categories={KeyboardCategories}/>
            <ProductHorizontal categoryName="Bàn phím" products={products_1} category="keyboard"/> 
            <HighLight product={products_1[1]}/>
            <ProductHorizontal categoryName="Switch" products={products_2} category="switch"/> 
            <ProductHorizontal categoryName="Keycap" products={products_3} category="keycap"/> 
            <FollowSocial />
            <Footer/>
        </div>
    );
}