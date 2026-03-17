import React, { useEffect } from "react";
import user_icon from '../Assets/ic_username.png';
import email_icon from '../Assets/ic_email.png';
import password_icon from '../Assets/ic_password.png';
import { useState } from "react";
import { motion } from 'framer-motion';
import './LoginForm.css';
import { useAuth } from "../../Context/auth";
import { AuthApi } from "../../Api/auth";
import { useNavigate } from "react-router-dom";
import { PopUp } from "../PopUp/PopUp.js";



export const LoginForm = () => {
    const [action, setAction] = useState("Login");
    const [message, setMessage] = useState("");
    const [launchPopUp, setLaunchPopUp] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const authApi = new AuthApi();

    useEffect(()=>{
        if(auth.user){
            navigate("/");
        } 
        setAction("Login");
        setMessage("");
    },[]);
    
    async function handleLogin(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target).entries());
        console.log(data);

        if(data.username.length == 0){
            setMessage("Vui lòng nhập tên tài khoản của bạn!");
            setLaunchPopUp(true);
            return;
        }

        if(data.password.length == 0){
            setMessage("Vui lòng nhập mật khẩu.");
            setLaunchPopUp(true);
            return; 
        }

        try{
            const res = await authApi.login(
                data.username,
                data.password
            ).then(res => {
                console.log(res.headers);
                setAuth({
                    user: res.data, 
                    token: JSON.stringify(res.headers.cookies)
                })
                navigate("/");
            })
        }
        catch(error){
            setMessage("Tài khoản hoặc mật khẩu không đúng. Xin vui lòng thử lại.");
            setLaunchPopUp(true);
        }       
    }

    async function handleRegister(event){
        event.preventDefault();
        const data = Object.fromEntries( new FormData(event.target).entries());
        console.log(data);

        if(data.username.length == 0){
            setMessage("Hãy điền tên tài khoản của bạn!");
            setLaunchPopUp(true);
            return; 
        }

        if(data.email.length == 0){
            setMessage("Hãy điền email của bạn!");
            setLaunchPopUp(true);
            return; 
        }
        
        if(data.password.length == 0 || data.re_password.length == 0){
            setMessage("Hãy điền mật khẩu tài khoản!"); 
            setLaunchPopUp(true);
            return; 
        }

        if(data.password != data.re_password){
            setMessage("Mật khẩu không nhập đúng. Xin hãy nhập lại!");
            setLaunchPopUp(true);
            return;
        }

        try{
           authApi.register(data.email, data.username, data.password)
        }
        catch(error){
            setMessage("Xin vui lòng nhập tài khoản hợp lệ!");
            setLaunchPopUp(true);
        }        
    }

    const variants = {
        open:{
            clipPath: 'circle(1200px at center)',
            transition: {
                type: "spring",
                stiffness: 20,
            }
        },
        closed: {
            clipPath: 'circle(0px at center)',
            transition:{
                type: "spring",
                stiffness: 400,
                damping: 40,
            }
        }
    };
    
    return(
        <motion.div className="form-container" 
            login-state={action}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}>
            <PopUp message={message} trigger={launchPopUp} setTrigger={setLaunchPopUp}></PopUp>
            
            <motion.div className="login-form"
            animate={ action === "Login" ? "open" : "closed" } variants={variants}
            >
                <div className="header">
                    <h3 >Đăng nhập</h3>
                    <div className="line-divider"></div> 
                </div>
            

                <form onSubmit={handleLogin}>
                    <div className="text-field">
                        <img src={user_icon}
                        alt="Username icon"
                        />
                        <input name="username" type="text" placeholder="Tên tài khoản"/>
                    </div>

                    <div className="text-field">
                        <img src={password_icon}
                        alt="Password Icon"
                        />
                        <input name="password" type="password" placeholder="Mật khẩu"/>
                    </div>
                    <p className="register-now"
                    onClick={() => {
                        setAction("Register")
                        setMessage("")
                    }}
                    >Hoặc đăng ký tài khoản mới!</p>
                    <button type="submit">Đăng nhập</button>
                </form>
            </motion.div>

            { action !== "Login" && 
            <motion.div className="register-form" 
            animate={ action === "Login" ? "closed" : "open" } variants={variants}>
                <div className="header">
                    <h3 >Đăng ký tài khoản mới</h3>
                    <div className="line-divider"></div> 
                </div>

                <form onSubmit={handleRegister}>
                    <div className="text-field">
                        <img src={user_icon}
                        alt="Username icon"
                        />
                        <input name="username" type="text" placeholder="Tên đăng nhập"/>
                    </div>

                    <div className="text-field">
                        <img src={email_icon}/>
                        <input name="email" type="text" placeholder="Email"/>
                    </div>

                    <div className="text-field">
                        <img src={password_icon}
                        alt="Password Icon"
                        />
                        <input name="password" type="password" placeholder="Mật khẩu"/>
                    </div>

                    <div className="text-field">
                    <img src={password_icon}
                        alt="Password Icon"
                        />
                        <input name="re_password" type="password" placeholder="Nhập lại mật khẩu"/>
                    </div>
                    <p className="register-now" id="login-text"
                    onClick={() => {
                        setAction("Login")
                        setMessage("")
                    }}
                    >Đã có tài khoản? Đăng nhập ngay!</p>
                    <button type="submit">Đăng ký</button> 
                </form>
            </motion.div>
            }
        </motion.div>
    );
}