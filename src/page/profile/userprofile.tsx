import Navbar from "../../components/navbar/navbar";
import PersonalProfile from "../../components/profile/profile";
import { Sidebar } from "../../components/sidebar/UserSidbar";


// import React from 'react';
export const UserProfileList  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <PersonalProfile/>
            </div>
    </div>
   
    );
};