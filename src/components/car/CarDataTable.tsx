/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppSelector } from "../../redux/features/Hook";

interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;
}
const CarDataTable = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [carData, setCarData] = useState<CarData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<any>();

  const [inputValue, setInputValue] = useState({
    date: "",
    title: "",
    destination: "",
    no_of_traveller: 0,
    start_time: "",
    end_time: "",
    car_id: 1,
    user_id: 0,
    status: 0,
    approved_by: "",
  });
  useEffect(() => {
    fetchCarList().then((response: any) => {
      setCarData(response.data);
      setRefresh(false);
    });
  }, []);

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
        })
        .catch((error) => {
          reject(error);
        });
    });
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
                handleBookNow(row.id);
              }}
            >
              Book Now
            </Button>
          </div>
        </>
      ),
    },
  ];
  const handleBookNow = (carId: number) => {
    setSelectedCarId(carId);
    setOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    inputValue["car_id"] = selectedCarId;
    inputValue["user_id"] = authRedux.user.id;
    sendDataToBackend();
    setOpen(false);
    setRefresh(true);
  };

  const sendDataToBackend = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/car_reservation`,
        {
          date: inputValue.date,
          title: inputValue.title,
          destination: inputValue.destination,
          start_time: inputValue.start_time,
          end_time: inputValue.end_time,
          no_of_traveller: inputValue.no_of_traveller,
          status: inputValue.status,
          user_id: inputValue.user_id,
          car_id: inputValue.car_id,
          approved_by: inputValue.approved_by,
        },
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then(() => {
        //setCarData(updatedCars);
        setOpen(false);
        setRefresh(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onBackDropClick = () => {
    setOpen(false);
  };

  return (
    <div className="car-reservation">
      <DataTable
        columns={columns}
        // className={darkMode ? "darkTable" : ""}
        data={carData}
        theme="solarized"
        pagination
        customStyles={{
          table: {
            style: {
              backgroundColor: "#000",
            },
          },
        }}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <h1>Car Reservation Form</h1>
          <div className="form">
            <input
              type="hidden"
              name="id"
              defaultValue={String(selectedCarId)}
            />

            <div className="elem-group">
              <label htmlFor="title">
                Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={inputValue.title}
                onChange={handleInputChange}
                placeholder="To meet with KBZ Bank client"
              />
            </div>
            <div className="elem-group">
              <label htmlFor="destination">
                Destination <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="destination"
                value={inputValue.destination}
                onChange={handleInputChange}
                placeholder="KBZ Bahan"
                required
              />
            </div>
            <div className="elem-group">
              <label htmlFor="no_of_traveller">
                Passenger <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="no_of_traveller"
                value={inputValue.no_of_traveller}
                onChange={handleInputChange}
                placeholder="Enter traveller number"
              />
            </div>
            <div className="elem-group">
              <label htmlFor="date">
                Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={inputValue.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="elem-group inlined">
              <label htmlFor="time">
                Time <span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="start_time"
                value={inputValue.start_time}
                id="teamname"
                onChange={handleSelectChange}
              >
                <option>--- start time ---</option>
                <option value="9:00:00">09:00am</option>
                <option value="10:00:00">10:00am</option>
                <option value="11:00:00">11:00am</option>
                <option value="12:00:00">12:00pm</option>
                <option value="13:00:00">01:00pm</option>
                <option value="14:00:00">02:00pm</option>
                <option value="15:00:00">03:00pm</option>
                <option value="16:00:00">04:00pm</option>
              </select>
            </div>
            <div className="elem-group inlined">
              <select
                name="end_time"
                value={inputValue.end_time}
                id="teamname"
                onChange={handleSelectChange}
              >
                <option>--- end time ---</option>
                <option value="10:00:00">10:00am</option>
                <option value="11:00:00">11:00am</option>
                <option value="12:00:00">12:00pm</option>
                <option value="13:00:00">01:00pm</option>
                <option value="14:00:00">02:00pm</option>
                <option value="15:00:00">03:00pm</option>
                <option value="16:00:00">04:00pm</option>
                <option value="17:00:00">05:00pm</option>
              </select>
            </div>
            <div className="button-group">
              <button onClick={handleFormSubmit}>Reserve</button>
              <button onClick={onBackDropClick}>Cancel</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarDataTable;
