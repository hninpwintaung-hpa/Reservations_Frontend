import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  TableContainer,
} from "@mui/material";
import { useAppSelector } from "../../redux/features/Hook";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DarkModeContext } from "../../context/darkModeContext";
import DataTable, { TableColumn } from "react-data-table-component";
import CarDataTable from "./CarDataTable";
export interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;
}
const CarCRUD = () => {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState<CarData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [inputValue, setInputValue] = useState<CarData>({
    id: 0,
    brand: "",
    capacity: 0,
    licence_no: "",
  });

  useEffect(() => {
    fetchCarList().then((response: any) => {
      setCarData(response.data);
      setRefresh(false);
    });
  }, [refresh]);

  const fetchCarList = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/cars", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
          setRefresh(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddNewCar = () => {
    setOpen(true);
  };
  const handleCreate = (e: any) => {
    sendDataToBackend({ inputValue });
    setOpen(false);
  };

  const sendDataToBackend = (data: { inputValue: CarData }) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://127.0.0.1:8000/api/cars",
          JSON.stringify(data.inputValue),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const onBackDropClick = () => {
    setOpen(false);
  };

  const columns: TableColumn<CarData>[] = [
    {
      name: "ID",
      selector: (row: CarData) => row.id,
    },
    {
      name: "Brand/Model",
      selector: (row: CarData) => row.brand,
    },
    {
      name: "Licence Plate",
      selector: (row: CarData) => row.licence_no,
    },
    {
      name: "Capacity",
      selector: (row: CarData) => row.capacity,
    },

    {
      name: "Actions",
      cell: (row: CarData) => (
        <>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e: any) => {
                e.preventDefault();
                handleEdit(row);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ marginLeft: "5px" }}
              onClick={(e: any) => {
                e.preventDefault();
                handleDelete(row.id);
              }}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const handleEdit = (data: CarData) => {
    setInputValue({ ...data });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/cars/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setCarData((prevData) => prevData.filter((item) => item.id !== id));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return (
    <>
      <div>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            handleAddNewCar();
          }}
          size="medium"
          variant="contained"
          disableRipple
        >
          Add New
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <div className="form">
              <h2>Add New Car</h2>
              <form>
                <div className="elem-group">
                  <label htmlFor="brand">Brand / Model:</label>
                  <input
                    type="text"
                    name="brand"
                    value={inputValue.brand}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="elem-group">
                  <label htmlFor="licence_no">Licence No:</label>
                  <input
                    type="text"
                    name="licence_no"
                    value={inputValue.licence_no}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="elem-group">
                  <label htmlFor="Capacity">Capacity:</label>
                  <input
                    type="number"
                    name="capacity"
                    value={inputValue.capacity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="button-group">
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
          </DialogContent>
        </Dialog>
      </div>
      <CarDataTable />
    </>
  );
};

export default CarCRUD;
