import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";

// import React from 'react';

export const Home  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
            </div>
            
        </div>
    );
};