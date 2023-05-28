import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Route, Routes } from "react-router-dom";
import { Car } from "../car/UserCar";
import { Room } from "../room/UserRoom";
import { UserDashboard } from '../dashboard/user-dashoard';
import AuthProvider from "../../redux/authProvider";

function UserView() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <Routes>
          <Route
            path="/*"
            element={<UserDashboard />}
          />
          <Route
            path="/car-reservation"
            element={<Car />}
          />
          <Route
            path="/room-reservation"
            element={<Room />}
          />
        </Routes>
        </AuthProvider>
    </div>
  );
}

export default UserView;
