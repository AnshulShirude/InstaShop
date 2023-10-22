import React from 'react';
import { NavLink } from 'react-router-dom';

function Homepage() {
    return (
        <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-mono mb-4 border-b border-white">Welcome!</h1>
            <p className="text-lg mb-8 font-mono">Welcome to the Application!</p>
            <NavLink to="/add-items">
                <button className="bg-white text-black py-2 px-6 rounded hover:bg-gray-500 hover:text-white border border-white">
                    Go to Add Items Page
                </button>
            </NavLink>
        </div>
    );
}

export default Homepage;
