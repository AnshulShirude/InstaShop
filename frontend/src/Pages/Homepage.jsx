import React from 'react';
import { NavLink } from 'react-router-dom';

function Homepage() {
    return (
        <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl font-mono mb-4 border-b border-white">Welcome!</h1>
            <NavLink to="/add-items">
                <button style={{backgroundColor: "black", fontSize:"20px", color: "white", width: "240px", height: "80px", border: "1px, black, solid"}} className="bg-white text-black py-2 px-6 rounded hover:bg-gray-500 hover:text-white border border-white">
                    Go to Add Items Page
                </button>
            </NavLink>
            <h2 style={{textAlign: "left" , paddingLeft: "30px"}} >How to use InstaShop</h2>
            <p style={{textAlign: "left", paddingLeft: "30px", paddingRight: "30px", fontSize: "18px"}} >Click the button at the bottom of the screen to go to our items page, where you can select the items you'd like. Please enter each item one by one and hit submit after. Once you're ready, select go to map to visualize the most efficient shopping path to save time today!</p> 
            <h2 style={{textAlign: "left" , paddingLeft: "30px"}} >Inspiration</h2>
            <p style={{textAlign: "left", paddingLeft: "30px", paddingRight: "30px", fontSize: "18px"}} >We've all been in the situation where we've ran back and forth in the store, looking for a single small thing on our grocery list. We've all been on the time crunch and have found ourselves running back and forth from dairy to snacks to veggies, frustrated that we can't find what we need in an efficient way. This isn't a problem that just extends to us as college students, but is also a problem which people of all ages face, including parents and elderly grandparents, which can make the shopping experience very unpleasant. InstaShop is a platform that solves this problem once and for all.</p> 
            
        </div>
    );
}

export default Homepage;
