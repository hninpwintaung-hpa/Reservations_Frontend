import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import SearchComponent from "../search/search";
import { Paper, TableContainer } from "@mui/material";
import { TimeFormatConverter } from "../room/RoomReservation";
interface ReservationData {
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: number;
  end_time: number;
  destination: string;
  no_of_traveller: number;
  status: number;
  user: { id: number; name: string; team: any };
  team: string;
  licence_no: string;
  approved_by: string;
}

function CarReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [carData, setCarData] = useState<ReservationData[]>([]);
  const [filterText, setFilterText] = useState("");
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    getCarData();
  }, []);
  const getCarData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/car_reservation", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          setCarData(response.data.data);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const columns: TableColumn<ReservationData>[] = useMemo(
    () => [
      {
        name: "Date",
        selector: (row: ReservationData) => row.date,
      },
      {
        name: "Licence No",
        selector: (row: ReservationData) => row.car.licence_no,
      },
      {
        name: "Reserved By",
        selector: (row: ReservationData) => row.user.name,
      },
      {
        name: "Team Name",
        selector: (row: ReservationData) => row.user.team.name,
      },
      {
        name: "Title",
        selector: (row: ReservationData) => row.title,
      },
      {
        name: "Destination",
        selector: (row: ReservationData) => row.destination,
      },
      {
        name: "Passengers",
        selector: (row: ReservationData) => row.no_of_traveller,
      },
      {
        name: "Start Time",
        selector: (row: ReservationData) => TimeFormatConverter(row.start_time),
      },
      {
        name: "End Time",
        selector: (row: ReservationData) => TimeFormatConverter(row.end_time),
      },
      {
        name: "Status",
        selector: (row: ReservationData) =>
          row.status == 1 ? "success" : "pending",
      },
      {
        name: "Approved By",
        selector: (row: ReservationData) => row.approved_by,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return carData;
    } else {
      return carData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.date.toString().includes(searchText) ||
          item.car.licence_no.toString().toLowerCase().includes(searchText) ||
          item.approved_by.toString().toLowerCase().includes(searchText) ||
          item.car.toString().toLowerCase().includes(searchText) ||
          item.destination.toString().toLowerCase().includes(searchText) ||
          item.end_time.toString().toLowerCase().includes(searchText) ||
          item.start_time.toString().toLowerCase().includes(searchText) ||
          item.no_of_traveller.toString().includes(searchText) ||
          item.user.team.name.toLowerCase().includes(searchText) ||
          item.user.name.toString().toLowerCase().includes(searchText) ||
          item.title.toString().toLowerCase().includes(searchText)
        );
      });
    }
  }, [carData, filterText]);

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: "15px", fontSize: "30px" }}>
          Car Reservation List Report
        </h1>
        <SearchComponent
          onFilter={handleFilterTextChange}
          onClear={handleClearFilter}
          filterText={filterText}
        />
      </div>
      <TableContainer component={Paper} style={{ maxWidth: 1300 }}>
        <DataTable
          columns={columns}
          className={darkMode ? "darkTable" : ""}
          data={filteredData}
          theme="solarized"
          pagination
          customStyles={{
            table: {
              style: {
                backgroundColor: "#000",
              },
            },
            headRow: {
              style: {
                backgroundColor: "#e0e2e7", // Set your desired header color here
                color: "#000", // Set the text color for the header
              },
            },
          }}
        />
      </TableContainer>
    </>
  );
}

export default CarReservationReport;
