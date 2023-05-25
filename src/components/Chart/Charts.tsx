import React from "react";
import "./Charts.scss";
import RoomReservationChart from "../../page/room/RoomBarChart";
import CarBarChart from "../../page/Car/CarBarChart";
import RoomPieChart from "../../page/room/RoomPieChart";
import CarPieChart from "../../page/Car/CarPieChart";

const Charts = () => {
  return (
    <div className="charts">
      <div className="width-50 align-center">
        <RoomReservationChart />
      </div>
      <div className="width-50 align-center">
        <CarBarChart />
      </div>
      <div className="width-50 align-center mt">
        <RoomPieChart />
      </div>
      <div className="width-50 align-center mt">
        <CarPieChart />
      </div>
    </div>
  );
};

export default Charts;
