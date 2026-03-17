import React from "react";
import './Category.css';
import { easeInOut, motion } from 'framer-motion';

export const Category = ({categoryName, categories}) => {
    
    const categorySelectionBox = categories.map(((category) => (
        <motion.div className="category-box-container"
            initial={{scale: 1}}
            whileHover={{
                scale: 1.15
            }}
            transition={{
                duration: 0.3,
                ease: easeInOut
            }}
        >
            <img src={category.imgsrc}
            alt={category.name}
            className="category-image"/>
            <div className="overlays"> 
                <h4 style={{paddingInline:"15px"}}>{category.name}</h4>
            </div>
        </motion.div>
    )));
    
    return(
        <div className="category-wrapper">
            <div className="category-title">
                <h1 >{categoryName}</h1>
            </div>
            <div className="category-selections">
                {categorySelectionBox}
            </div>
        </div>
    );
}