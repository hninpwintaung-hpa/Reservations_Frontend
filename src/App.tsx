import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./page/home/home";
// import { Register } from "./page/register/register";
// import { Room } from "./page/room/room";
// import { Car } from "./page/car/car";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import Login from "./page/login/login";
import AuthProvider from "./redux/authProvider";
import { useAppSelector } from "./redux/features/Hook";
import { AuthRole } from "./redux/features/type/authType";
import { Car } from "./page/car/car";
// import TableUser from "./components/User/normaluser";
// import MyComponent from "./components/User/normaluser";
// import NormalUser from "./components/User/normaluser";
// import { UserNormal } from "./page/user/normalUser";
import { UserPro } from "./page/user/proUser";
import Register from "./page/register/register";
import { Dashboard } from "./page/dashboard/dashboard";
import Room from "./page/room/room";
import RoomReservationForm from "./page/room/RoomReservationForm";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  // const handleRegister = (username: string, email: string, team_name: string, password: string, confirmPassword: string) => {
  //   // Make an API call to register the user
  //   console.log(`Registering with username: ${username},email: ${email}, password: ${password}, confirmpassword: ${confirmPassword},team_name: ${team_name}`);
  // };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <Routes>
          {authRedux.role === AuthRole.Admin && (
            <Route
              path="admin-dashboard/reservation/dashboard"
              element={<Dashboard />}
            />
          )}
          {authRedux.role === AuthRole.Admin && (
            <Route
              path="/Admin-dashboard/user/pro-user"
              element={<UserPro />}
            />
          )}
          {/* <Route path="/user/pro-user" element={<UserPro/>}/> */}
          {/* <Route path="/user/normal-user" element={<UserNormal/>}/> */}
          {authRedux.role === AuthRole.Admin && (
            <Route path="/Admin-dashboard/car" element={<Car />} />
          )}
          {/* <Route path="/car" element={ <Car/>}/> */}
          {/* <Route path="/Admin-dashboard/" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login />} />

          <Route path="/another-page" Component={RoomReservationForm} />

          {authRedux.role === (AuthRole.Admin || AuthRole.staff) && (
            <Route path="/rooms" element={<Room />} />
          )}

          {authRedux.role === AuthRole.Admin && (
            <Route path="/Admin-dashboard/" element={<Home />} />
          )}

          {/* <Route path="/Admin-dashboard" element={<div>hello</div>} /> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
