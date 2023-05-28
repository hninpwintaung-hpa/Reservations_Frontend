import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import SearchComponent from "../search/search";
interface DataRow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  destination: string;
  no_of_traveller: number;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: { id: number; name: string; team: any };
  team: string;
  licence_no: string;
  approved_by: string;
}

function CarReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [carData, setCarData] = useState<DataRow[]>([]);
  const [filterText, setFilterText] = useState("");
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCarData().then((response: any) => {
      console.log(response.data);
      //   setIsUpdated(false);
      //   setT(response.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          console.log(response.data);
          setCarData(response.data.data);
          //   setTeamList(response.data);
          //   setUserData(response.data);
          //   console.log(response.data.data);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Id",
        selector: (row: DataRow) => row.id,
      },
      {
        name: "Date",
        selector: (row: DataRow) => row.date,
      },
      {
        name: "Licence No",
        selector: (row: DataRow) => row.car.licence_no,
      },
      {
        name: "Title",
        selector: (row: DataRow) => row.title,
      },
      {
        name: "Destination",
        selector: (row: DataRow) => row.destination,
      },
      {
        name: "Passenger",
        selector: (row: DataRow) => row.no_of_traveller,
      },
      {
        name: "Start_Time",
        selector: (row: DataRow) => row.start_time,
      },
      {
        name: "End_Time",
        selector: (row: DataRow) => row.end_time,
      },
      {
        name: "Requested_User",
        selector: (row: DataRow) => row.user.name,
      },
      {
        name: "Team_Name",
        selector: (row: DataRow) => row.user.team.name,
      },
      {
        name: "Status",
        selector: (row: DataRow) => (row.status == 1 ? "success" : "pending"),
      },
      {
        name: "Approved_By",
        selector: (row: DataRow) => row.approved_by,
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
        }}
      />
    </>
  );
}

export default CarReservationReport;
