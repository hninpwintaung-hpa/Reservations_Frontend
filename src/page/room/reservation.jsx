import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { Sidebar } from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

export const Reservation = () => {
  const rooms = ["room1", "room2", "room3"];
  const [cellData, setCellData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/room_reservation"
      );
      const data = response.data;

      setCellData(data);

      if (Array.isArray(response.data)) {
        const formattedData = response.data.map((item) => ({
          room: item.room,
          start_time: Number(item.start_time.split(":")[0]),
          end_time: Number(item.end_time.split(":")[0]),
          title: item.title,
          description: item.description,
        }));
        setCellData(formattedData);
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="home">
      <Sidebar />{" "}
      <div className="homeContainer">
        <Navbar />
        <h1>Room Reservation Page</h1>
        <DataTable rooms={rooms} cellData={cellData} />
      </div>
    </div>
  );
};

export default Reservation;
