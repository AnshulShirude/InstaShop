import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../styles.css'
// import '.././styles.css';


function Homepage() {
    return (
        <div className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold mb-4">Welcome!</h1>
            <p className="text-lg mb-8">Welcome to the Application!</p>
            <NavLink to="/add-items">
                <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700">
                    Go to Add Items Page
                </button>
            </NavLink>
        </div>
    );
}

export default Homepage;
