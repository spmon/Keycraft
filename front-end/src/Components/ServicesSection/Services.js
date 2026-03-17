import React from "react";
import { motion } from 'framer-motion'; 
import { ServiceCard } from "../ServiceCard/ServiceCard";
import iconCustomer  from '../Assets/ic_customer.png';
import iconCost from '../Assets/ic_cost.png';
import iconShipping from '../Assets/ic_shipping.png';
import './Services.css';

const variants ={
    initial:{
        y: -50, 
        opacity: 0
    },
    animate:{
        y: 0, 
        opacity: 1,
        transition: {
            duration: 3,
            type: 'spring',
            bounce: 0.2,
            delayChildren: 0.2,
            staggerChildren: 0.3,
            dampness: 400,
        }
    }
}


export const Services = () => {
    const Services = [
        {
            iconsrc: iconCustomer, 
            title: 'Luôn hỗ trợ', 
            desc: "Nếu quý khách có bất kỳ lo ngại gì hãy liên hệ với chúng tôi!"
        },
        {
            iconsrc: iconCost, 
            title: 'Đổi trả dễ dàng', 
            desc: "Cam kết hàng hóa được đổi trả miễn phí trong vòng 3 ngày kể từ ngày mua"
        },
        {
            iconsrc: iconShipping, 
            title: 'Miễn phí vận chuyển', 
            desc: "Vận chuyển đến tận nơi, miễn phí với đơn từ 1,200k trở lên!"
        }
    ];

    return(
        <div className="services-wrapper">
            <motion.div className="header" 
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, ammount: 0.8}}
            >
                <h2>Bàn phím cơ sang trọng</h2>
                <p>Bộ sưu tập của chúng tôi mang đến cho bạn bàn phím cơ chất lượng cao trong bố cục 60%, 75% và TKL.
                Tất cả các bàn phím tự hào có vỏ nhôm cao cấp, thiết kế thời trang và có khả năng hotswap. Có sẵn trong các tùy chọn màu sắc khác nhau.</p>
            </motion.div>

            <motion.div className="service-boxes"
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                >
                {Services.map(service => ( 
                    <ServiceCard service={service}/>
                ))}
            </motion.div>

        </div>
    );
}