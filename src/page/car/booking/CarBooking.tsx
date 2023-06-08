// import React from 'react';

import { useNavigate } from "react-router-dom";
import CarDataTable from "../../../components/car/CarDataTable";
import Navbar from "../../../components/navbar/navbar";
import { Sidebar } from "../../../components/sidebar/UserSidbar";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";

export const CarBooking = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="reserve-container">
          <h1 className={darkMode ? "dark_title" : "page_title"}>
            {" "}
            Car Booking{" "}
          </h1>

          <div className="padding">
            <Button
              onClick={goBack}
              style={{ marginBottom: "15px", marginLeft: "10px" }}
              size="medium"
              variant="contained"
              disableRipple
            >
              &larr; Go Back
            </Button>
            <CarDataTable />
          </div>
        </div>
      </div>
    </div>
  );
};
