import Navbar from "../../components/navbar/navbar";
import RoomReservation from "../../components/room/RoomReservation";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

// import React from 'react';
export const RoomReservationPage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <RoomReservation />
      </div>
    </div>
  );
};
