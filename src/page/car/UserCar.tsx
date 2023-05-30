import { Link } from "react-router-dom";
import TableCar from "../../components/car/tableCar";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import { Button } from "@mui/material";
import "./UserCarStyles.scss";
import { useState } from "react";
export const Car = () => {
  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="reservation-container">
          <h1>Car Reservations Schedules</h1>
          <div className="date">
            <Link
              to="/staff-dashboard/car-reservation/car-booking"
              style={{
                display: "block",
                textAlign: "left",
                marginTop: "10px",
                marginLeft: "10px",
                cursor: "default",
              }}
            >
              <Button size="medium" variant="contained" disableRipple>
                Book Car
              </Button>
            </Link>
            <div className="date__dateFilter">
              <label> Search by Date : &nbsp;</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <TableCar date={searchDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
