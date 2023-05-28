// import { Routes, Route, Navigate } from "react-router-dom";
// import { Home } from "./page/home/home";
// import { DarkModeContext } from "./context/darkModeContext";
// import { useContext } from "react";
// import Login from "./page/login/login";
// import AuthProvider from "./redux/authProvider";
// import { useAppSelector } from "./redux/features/Hook";
// import { AuthRole } from "./redux/features/type/authType";
// import { Car } from "./page/Car/car";
// import { UserPro } from "./page/user/proUser";
// import Register from "./page/register/register";
// import { Dashboard } from "./page/dashboard/dashboard";
// import Room from "./page/room/room";
// import RoomReservationForm from "./page/room/RoomReservationForm";
// import RoomBarChart from "./page/room/RoomBarChart";
// import RoomPieChart from "./page/room/RoomPieChart";
// import CarPieChart from "./page/Car/CarPieChart";
// import CarBarChart from "./page/Car/CarBarChart";
// import Charts from "./components/Chart/Charts";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);
//   const authRedux = useAppSelector((state) => state.auth);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <AuthProvider>
//         <Routes>
//           {authRedux.role === AuthRole.Admin && (
//             <Route
//               path="admin-dashboard/reservation/dashboard"
//               element={<Dashboard />}
//             />
//           )}
//           {authRedux.role === AuthRole.Admin && (
//             <Route
//               path="/Admin-dashboard/user/pro-user"
//               element={<UserPro />}
//             />
//           )}
//           {authRedux.role === AuthRole.Admin && (
//             <Route path="/Admin-dashboard/car" element={<Car />} />
//           )}
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<Navigate to="/login" replace={true} />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/room-barChart" Component={RoomBarChart} />
//           <Route path="/car-barchart" Component={CarBarChart} />
//           <Route path="/another-page" Component={RoomReservationForm} />
//           <Route path="/room-pieChart" Component={RoomPieChart} />
//           <Route path="/car-pieChart" Component={CarPieChart} />
//           <Route path="/Chart" Component={Charts} />
//           {authRedux.role === (AuthRole.Admin || AuthRole.staff) && (
//             <Route path="/rooms" element={<Room />} />
//           )}

//           {authRedux.role === AuthRole.Admin && (
//             <Route path="/Admin-dashboard/" element={<Home />} />
//           )}

//           {/* <Route path="/Admin-dashboard" element={<div>hello</div>} /> */}
//         </Routes>
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import AuthProvider from "./redux/authProvider";
import { useAppSelector } from "./redux/features/Hook";
import { AuthRole } from "./redux/features/type/authType";
import Register from "./page/register/register";
import Error404 from "./page/error/Error404";
import AdminView from "./page/admin/AdminView";
import UserView from "./page/user/UserView";
import Login from "./page/login/login";
import { SuccessMessageProvider } from "./components/SuccessMessageContext/SuccessMessageContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <SuccessMessageProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />

            {authRedux.role === AuthRole.Superadmin && (
              <Route path="SuperAdmin-dashboard/*" element={<AdminView />} />
            )}
            {authRedux.role === AuthRole.staff && (
              <Route path="Staff-dashboard/*" element={<UserView />} />
            )}
          </Routes>
        </SuccessMessageProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
