import React, { useState } from 'react';
import './navigation.css'
import { FaHome, FaBars, FaSignOutAlt} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Menubar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); 
      };

    const menuItem=[
        {
            path:"/dashboard",
            name:"Tasks",
            icon:<FaHome/>
        },
        {
            path:"/",
            name:"Logout",
            icon: <div onClick={handleLogout}>
                     <FaSignOutAlt />  
                  </div>
        },

    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "260px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h2 style={{display: isOpen ? "block" : "none"}} className="logo">TodoList</h2>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Menubar;
