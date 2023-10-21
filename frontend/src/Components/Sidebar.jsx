import { AiOutlineMenu } from "react-icons/ai";
import { BsPlus, BsFillHouseDoorFill, BsInfoCircle, BsMap } from "react-icons/bs";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    // const menuItem = [
    //     // TODO': add paths to home, project, experience page: DONE
    // ]
    const menuItem = [
        { name: 'HomePage', path: '/', icon:  <BsFillHouseDoorFill/>},
        { name: 'AddItems', path: '/add-items' , icon: <BsPlus />},
        { name: 'AboutUs', path: '/about-us', icon : <BsInfoCircle />},
        { name: 'MapPage', path: '/map', icon : <BsMap />}
    ]
    return (
        <div className="sidebar_container">
            {/* <div className="sidebar"> */}
            <div className={`sidebar ${!isOpen ? 'small' : ''}`}>
                {
                    isOpen && menuItem.map(item => (
                        <NavLink key={item.name} to={item.path} className="link">
                            <div className="icon">
                                {/* icon logic here: DONE */}
                                {/* {item.name === "Home" && <BsFillHouseDoorFill />}
                                {item.name === "Project" && <BsLaptopFill />}
                                {item.name === "Experience" && <BsFillLightbulbFill />} */}
                                {item.icon}
                            </div>
                            {<span className="link_text">{item.name}</span>}
                        </NavLink>
                    ))
                    // menuItem.map(item => )
                    // TODO: using map to loop through menuItem to create navlink for all three navigation buttons :DONE
                    // TODO: hide the texts when sidebar is collapsed : DONE
                    // hint, classname for NavLink is link, classname for icon is icon, and classname for the text on the links is link_text :DONE
                }
                {/* .extention_toggle 
.extention_toggle:hover 

.toggle_container  */}
                {/* <div className='toggle_container'> */}
                {/* <div className={`toggle_container ${!isOpen ? 'small' : ''}`}> */}
                <div className='toggle_container'>
                    {/* <div className={`side ${isOpen ? 'small' : '' }`}> */}
                    {/* TODO:  add function to make the sidebar collapsable */}
                    <div className={`extention_toggle`}  onClick={() => toggle()}>
                        <AiOutlineMenu />
                    </div>
                </div>
            </div>
            <main className="main_container">{children}</main>
        </div>
    );
};

export default Sidebar;


// import React from 'react';
// import { NavLink } from 'react-router-dom';

// function Sidebar() {
//     return (
//         <div className="sidebar">
//             <NavLink to="/" activeClassName="active">Home</NavLink>
//             <NavLink to="/add-items" activeClassName="active">Add Items</NavLink>
//             <NavLink to="/about-us" activeClassName="active">About Us</NavLink> 
//             <NavLink to="/map" activeClassName="active">Map</NavLink>
//         </div>
//     );
// }

// export default Sidebar;
