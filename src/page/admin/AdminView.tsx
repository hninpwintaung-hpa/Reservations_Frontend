import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
// import { useAppSelector } from "../../redux/features/Hook";
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../dashboard/admin-dashboard";
import { ProUserList } from "../list/pro";
import { NormalUserList } from "../list/normal";
import { Car } from "../Car/AdminCar";
import { AdminRoom } from "../room/AdminRoom";
import CarReport from "../../components/report/carReport";
import TeamReport from "../../components/report/teamReport";
import CarReservationReport from "../../components/report/carReservation";
import RoomReservationReport from "../../components/report/roomReservation";
import RoomReport from "../../components/report/roomReport";
import CarCRUD from "../creation/CarCRUD";
import { RoomCreation } from "../creation/roomCreation";
import { TeamCreation } from "../creation/teamCreation";
import Room from "../../components/create/room";
import RoomReservation from "../../components/room/RoomReservation";
import { RoomReservationPage } from "../room/RoomReservationPage";
import RoomReservationForm from "../../components/room/RoomReservationForm";

function AdminView() {
  console.log("hello admin");
  const { darkMode } = useContext(DarkModeContext);
  // const authRedux = useAppSelector((state) => state.auth);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="/*" element={<AdminDashboard />} />
        <Route path="/pro-user" element={<ProUserList />} />
        <Route path={`/normal-user`} element={<NormalUserList />} />
        <Route path={`/car-reservation`} element={<Car />} />
        <Route path={`/room-reservation`} element={<RoomReservationPage />} />
        <Route path={`/reserve-room`} element={<RoomReservationForm />} />
        {/* <Route path={ `/Userroom-`} /> */}
        <Route path={`/car-report`} element={<CarReport />} />

        <Route path={`/team-report`} element={<TeamReport />} />

        <Route
          path={`/car-reservation-report`}
          element={<CarReservationReport />}
        />
        <Route path={`/room-reservation`} element={<Room />} />
        <Route
          path={`/room-reservation-report`}
          element={<RoomReservationReport />}
        />

        <Route path={`/room-report`} element={<RoomReport />} />
        <Route path={`/car-creation`} element={<CarCRUD />} />
        <Route path={`/room-creation`} element={<RoomCreation />} />
        <Route path={`/team-creation`} element={<TeamCreation />} />
      </Routes>
    </div>
  );
}

export default AdminView;
