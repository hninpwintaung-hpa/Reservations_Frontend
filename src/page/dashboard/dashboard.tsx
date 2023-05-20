import React, { useEffect, useState } from "react";
import { Card } from "../../components/card/card";
import { TeamCard } from "../../components/card/teamCard";
import AdminCarReserveTable from "../../components/dashboard_table/AdminCarReserveTable";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import AdminRoomReserveTable from "../../components/dashboard_table/AdminRoomReserveTable";

import axios from "axios";

export interface roomReservationData {
  date: string;
  description: string;
  end_time: string;
  id: number;
  room_id: number;
  start_time: number;
  title: string;
  user_id: number;
}

export interface carReservationData {
  date: string;
  title: string;
  start_time: number;
  end_time: string;
  destination: string;
  no_of_traveller: number;
  status: number;
  id: number;
  car_id: number;
  user_id: number;
  remark: string;
  approved_by: string;
}

export const Dashboard: React.FC = () => {
  const [roomReservation, setRoomReservation] = useState<roomReservationData[]>([]);

  const [carReservation, setcarReservation] = useState<carReservationData[]>([]);

  useEffect(() => {
    getRoomReservation().then((response: any) => {
      setRoomReservation(response.data);
    });

    getCarReservation().then((response: any) => {
      setcarReservation(response.data);
    })
  }, []);

  const getRoomReservation = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_reservation")
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getCarReservation = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_reservation")
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="dashboard-container" style={{ padding: "5px" }}>
          <Card />
          <Card />
          <Card />
          <Card />
          <h1
            style={{
              paddingTop: "5px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Room Reservation List
          </h1>
          <AdminRoomReserveTable data={roomReservation} />
          <h1
            style={{
              paddingTop: "5px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Car Reservation List
          </h1>
          <AdminCarReserveTable data={carReservation}/>

          <div>
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </div>
      </div>
    </div>
  );
};
