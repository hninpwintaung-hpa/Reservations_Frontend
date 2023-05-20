import { Link } from "react-router-dom";
import TableCar from "../../components/car/list";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Button } from "@mui/material";

// import React from 'react';
export const Car  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1 style={{ textAlign:"center" , fontSize:"25px" , fontWeight:"700"}}>Car Reservation Page</h1>
                <div><Link to="car-reservation" style={{ display:"block", textAlign:"left", marginTop:"10px",marginLeft:"10px", cursor:"default" }}><Button size="medium" variant="contained"  disableRipple>Car Reservation</Button></Link></div>
                <div style={{ marginRight:"15px" }}>
                <TableCar/>
                </div>
            </div>
    </div>
    );
};