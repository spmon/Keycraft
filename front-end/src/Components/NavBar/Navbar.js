import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { NavMenu } from "../NavMenu/Navmenu";
import { AuthApi } from "../../Api/auth";
import './Navbar.css';
import userprofile_icon from '../Assets/ic_user.png';
import menu_icon from '../Assets/ic_menu.png';

export const NavBar = () =>{
    const [auth, setAuth] = useAuth();
    const authApi = new AuthApi();

    const _handleLogoutEvent = () => {
        try{
            setAuth({
                user: null,
                token: "",
            });
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className="navbar-wrapper">
            <div className="website-title">
                <p id="website-title-text">Keycraft</p>
            </div>
            <NavMenu />
            <div className="userpfp-and-menu-bar">
                {(auth.user) ? <p>{auth.user["name"]}</p> :
                    <Link to="/login">
                    <img
                        src={userprofile_icon}
                        alt="User Profile Icon"
                    />
                    </Link>
                }

                
                {(auth.user) ? <button style={{fontSize:"12px"}}onClick={_handleLogoutEvent}>
                    Đăng xuất
                </button> : null}
            </div>
        </div>
    );
}