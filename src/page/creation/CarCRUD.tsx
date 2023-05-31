import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import CarDataTable from "../../components/create/CarDataTable";
import { useAppSelector } from "../../redux/features/Hook";

const CarCRUD = () => {
  const authRedux = useAppSelector((state) => state.auth);

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
          <Link
            to={`/${authRedux.role}-dashboard/car-create`}
            style={{
              display: "block",
              textAlign: "left",
              marginTop: "10px",
              marginLeft: "10px",
              cursor: "default",
            }}
          >
            <Button size="medium" variant="contained" disableRipple>
              Add New
            </Button>
          </Link>
        </div>
        <CarDataTable />
      </div>
    </div>
  );
};

export default CarCRUD;
