import { SmallImagePreview } from "../SmallImagePreview/SmallImagePreview";
import { useState } from "react";
import { motion } from "framer-motion";
import './ProductPictures.css';

export const ProductPictures = ({pictures}) =>{
    const [currentIndex, setImageIndex] = useState(0);

    return(
        <div>
            <div className="prev-image-container">
                <div style={{
                        width: "100%",
                        display: "flex",
                        height: "400px",
                        overflow: "hidden"
                    }}

                >
                    {pictures.map(pic => (
                        <motion.img
                            src={pic}
                            alt="Product Image Preview"
                            transition={{
                                stiffness: '90'
                            }}
                            whileInView={{ opacity: 1}}
                            animate={{
                                translateX: `${currentIndex * -100}%`,
                            }}
                        
                        />
                    ))}
                </div>
            </div>
            <div
                style={{
                display: "flex",
                flexDirection: "row",
                height: "100px",
                gap: "1px",
                }}
            >
                {pictures.map((_, index) => (
                <button
                    key={index}
                    style={{
                        backgroundImage: "none",
                        backgroundColor: "transparent",
                    }}
                    onClick={() => setImageIndex(index)}
                >
                    {index === currentIndex ? ( 
                        <SmallImagePreview image={_} hasBorder={true}/>
                    ) : (
                        <SmallImagePreview image={_} hasBorder={false}/>
                    )}
                </button>
                ))}
            </div>
        </div>
    );

   function showNextImage(){
        setImageIndex(currentIndex => {
            if (currentIndex < pictures.length -1){
                return currentIndex + 1;
            }
            else{
                return 0;
            }
        });
   }
   function showPreviousImage(){
        setImageIndex(currentIndex => {
            if (currentIndex > 0){
                return currentIndex - 1;
            }
            else{
                return pictures.length - 1;
            }
        });
    }
}