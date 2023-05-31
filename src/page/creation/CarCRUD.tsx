import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import CarDataTable from "../../components/create/CarDataTable";
import { useAppSelector } from "../../redux/features/Hook";
import { useState } from "react";
interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;
}
const CarCRUD = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<CarData>({
    id: 0,
    brand: "",
    capacity: 0,
    licence_no: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = (e: any) => {
    sendDataToBackend({ inputValue });
    navigate(-1);
  };

  const sendDataToBackend = (data: { inputValue: CarData }) => {
    fetch(`http://127.0.0.1:8000/api/cars`, {
      method: "POST",
      body: JSON.stringify(inputValue),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onBackDropClick = () => {
    setOpen(false);
  };

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
          <form>
            <div>
              <label htmlFor="brand">Brand / Model:</label>
              <input
                type="text"
                name="brand"
                value={inputValue.brand}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="licence_no">Licence No:</label>
              <input
                type="text"
                name="licence_no"
                value={inputValue.licence_no}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="Capacity">Capacity:</label>
              <input
                type="number"
                name="capacity"
                value={inputValue.capacity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Button
                onClick={handleCreate}
                variant="contained"
                color="primary"
                size="small"
              >
                Create
              </Button>
              <Button
                onClick={onBackDropClick}
                variant="contained"
                color="primary"
                size="small"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
        <CarDataTable />
      </div>
    </div>
  );
};

export default CarCRUD;
