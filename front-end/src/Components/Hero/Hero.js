import React from "react";
import { useState } from "react";
import { motion } from 'framer-motion';
import { Circle } from '../Assets/Circle.js';
import { CircleDot } from '../Assets/CircleDot.js';
import { Link } from "react-router-dom";
import './Hero.css';

export const Hero = ({ slides }) => {
   const [currentIndex, setImageIndex] = useState(0);

   function showNextImage(){
    setImageIndex(currentIndex => {
        if (currentIndex < slides.length -1){
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
                return slides.length - 1;
            }
        });
   }
    
    return(
        <div className="hero-wrapper">
             <div className="image-container">
                <div style={{
                       width: "100%",
                       height: "100%",
                       display: "flex",
                       overflow: "hidden"
                    }}
   
                >
                    {slides.map(slide => (
                        <motion.img
                            src={slide.imgsrc}
                            alt={slide.name}
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

                <div className="event-listener-wrapper">
                    <button id="left-side-listener" onClick={showPreviousImage}>
                    </button>
                    <button id="right-side-listener" onClick={showNextImage}>
                    </button>
                </div>

                <div
                    style={{
                    position: "absolute",
                    bottom: ".5rem",
                    left: "50%",
                    translate: "-50%",
                    display: "flex",
                    gap: "2px",
                    }}
                >
                    {slides.map((_, index) => (
                    <button
                        key={index}
                        style={{
                            backgroundImage: "none",
                            backgroundColor: "transparent",
                        }}
                        onClick={() => setImageIndex(index)}
                    >
                        {index === currentIndex ? (
                        <CircleDot/>
                        ) : (
                        <Circle/>
                        )}
                    </button>
                    ))}
                </div>
            </div>

            <div className="info-box">
                <h4>{slides[currentIndex].name}</h4>
                <Link to={`${slides[currentIndex].link}`}><button>Mua ngay</button></Link>
            </div>
        </div>
    );
}