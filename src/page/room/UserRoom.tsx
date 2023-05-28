import Navbar from "../../components/navbar/navbar";
import RoomReservation from "../../components/room/RoomReservation";
import { Sidebar } from "../../components/sidebar/UserSidbar";

// import React from 'react';
export const Room = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>Room Reservation Page</h1>
        <RoomReservation />
      </div>
    </div>
  );
};
