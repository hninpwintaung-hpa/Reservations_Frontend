// import React from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
// import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
// import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AcePlus from "../img/mainLogo.png";
import { resetAuth } from "../../redux/features/auth/authSlice";
import { AuthRole } from "../../redux/features/type/authType";
import { useAppDispatch, useAppSelector } from "../../redux/features/Hook";
// import { Button } from "@mui/material";
// import { blue } from "@mui/material/colors";
export const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const authDispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    authDispatch(resetAuth());
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={AcePlus} alt="" width={130} className="img" />
      </Link>
      <hr />
      {authRedux.role === AuthRole.staff && (
        <>
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <Link
                to={`/${authRedux.role}-dashboard`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </li>
              </Link>
              <p className="title">Reservation</p>
              <Link
                to={`/ ${authRedux.role}-dashboard/room-seversation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <MeetingRoomIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-reservation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <CarRentalIcon className="icon" />
                  <span>Cars</span>
                </li>
              </Link>
              {/* <p className="title">SETTING</p>
          <li>
            <AccountCircleRoundedIcon className="icon" />
            <span>Profile</span>
          </li> */}
            </ul>
            <div className="bottom">
              <div
                className="colorOption"
                onClick={() => dispatch({ type: "LIGHT" })}
              ></div>
              <div
                className="colorOption"
                onClick={() => dispatch({ type: "DARK" })}
              ></div>
            </div>
          </div>
          <button
            style={{
              border: "none",
              padding: "15px",
              backgroundColor: "#979797",
              borderRadius: "50%",
              boxShadow: "3px 3px 5px orange",
              color: "orange",
              cursor: "pointer",
              marginLeft: "10px",
              marginTop: "10px",
            }}
            onClick={handleLogout}
          >
            {" "}
            LOGOUT
          </button>
        </>
      )}
    </div>
  );
};
