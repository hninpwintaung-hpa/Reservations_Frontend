import { useContext } from "react";
import NormalUser from "../../components/User/normaluser";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import { DarkModeContext } from "../../context/darkModeContext";

// import React from 'react';

export const NormalUserList = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1 className={darkMode ? "dark_title" : "page_title"}>
          Normal User Lists
        </h1>
        <NormalUser />
      </div>
    </div>
  );
};
