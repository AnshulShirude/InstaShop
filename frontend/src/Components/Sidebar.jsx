import { AiOutlineMenu } from "react-icons/ai";
import {
  BsPlus,
  BsFillHouseDoorFill,
  BsInfoCircle,
  BsMap,
} from "react-icons/bs";
import React, { useState } from "react";
import { useContext } from "react";
import { NodesContext } from "../App";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const { nodes } = useContext(NodesContext);
  const [isOpen, setIsOpen] = useState(false);
  //   const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { name: "HomePage", path: "/", icon: <BsFillHouseDoorFill /> },
    { name: "AddItems", path: "/add-items", icon: <BsPlus /> },
  ];

  nodes && menuItem.push({ name: "MapPage", path: "/map", icon: <BsMap /> });
  return (
    <div className="sidebar_container">
      <div className={`sidebar`}>
        <div className="title">InstaShop</div>
        {menuItem.map((item) => (
          <NavLink key={item.name} to={item.path} className="link">
            {<span className="link_text">{item.name}</span>}
          </NavLink>
        ))}
      </div>
      <main className="main_container">{children}</main>
    </div>
  );
};

export default Sidebar;
