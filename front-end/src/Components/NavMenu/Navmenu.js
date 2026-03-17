import React from "react";
import { NavLink } from "react-router-dom";
import './Navmenu.css';
import { useAuth } from "../../Context/auth";
import { useCart } from "../../Context/cart";

export const NavMenu = () => {

    const [auth, setAuth] = useAuth();
    const cart = useCart();
    var itemCount = cart ?  cart.length : 0;


    const NavigationItem = [
        {
            name: 'Trang chủ',
            path: '/', 
        },
        {
            name: 'Bàn phím',
            path: '/keyboard', 
        },
        {
            name: 'Switch',
            path: '/switch', 
        },
        {
            name: 'Keycap',
            path: '/keycap',  
        },
    ];

    const listItems = NavigationItem.map((item) => 
        <li>
            <NavLink to={item.path} style={{textDecoration:"none"}}>
                <h4>{item.name}</h4>
            </NavLink>
        </li>
    );

    return(
        <ul className="nav-menu">
            {listItems}
            {
                (auth.user) ? 
                <li>
                     <NavLink to="/cart" style={{textDecoration:"none"}}>
                         <h4>Giỏ hàng</h4>
                     </NavLink>
                </li>
       
                : ""
            }
            {
             (itemCount != 0 && auth.user)? (
                <div className='cart-item-count'>
                    <p>{itemCount}</p>
                </div>
                ): (
                <div></div>
                )
            }
            
        </ul>
    );
}