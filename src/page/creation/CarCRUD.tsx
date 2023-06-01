import CarCRUD from "../../components/create/CarCRUD";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

const CarCreate = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1
          style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}
        >
          Car Creation Page
        </h1>
        <div>
          <CarCRUD />
        </div>
      </div>
    </div>
  );
};

export default CarCreate;
