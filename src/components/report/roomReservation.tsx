import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import SearchComponent from "../search/search";
import { Paper, TableContainer } from "@mui/material";
import { TimeFormatConverter } from "../room/RoomReservation";
interface ReservationData {
  name: string;
  id: number;
  date: string;
  title: string;
  start_time: number;
  end_time: number;
  description: string;
  room: { id: number; name: string };
  user: { id: number; name: string; team: { id: number; name: string } };
}

function RoomReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [roomData, setRoomData] = useState<ReservationData[]>([]);
  const [filterText, setFilterText] = useState("");
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRoomData().then((response: any) => {
      console.log(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getRoomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/room_reservation", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setRoomData(response.data.data);
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
        name: "Reserved By",
        selector: (row: ReservationData) => row.user.name,
      },
      {
        name: "Team Name",
        selector: (row: ReservationData) => row.user.team.name,
      },
      {
        name: "Room Name",
        selector: (row: ReservationData) => row.room.name,
      },
      {
        name: "Title",
        selector: (row: ReservationData) => row.title,
      },
      {
        name: "Description",
        selector: (row: ReservationData) => row.description,
      },
      {
        name: "Start Time",
        selector: (row: ReservationData) => TimeFormatConverter(row.start_time),
      },
      {
        name: "End Time",
        selector: (row: ReservationData) => TimeFormatConverter(row.end_time),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return roomData;
    } else {
      return roomData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.date.toString().includes(searchText) ||
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.room.name.toLowerCase().includes(searchText) ||
          item.end_time.toString().toLowerCase().includes(searchText) ||
          item.start_time.toString().toLowerCase().includes(searchText) ||
          item.user.team.name.toLowerCase().includes(searchText) ||
          item.user.name.toLowerCase().includes(searchText)
        );
      });
    }
  }, [roomData, filterText]);

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
          Room Reservation List Report
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
                backgroundColor: "#e0e2e7",
                color: "#000",
              },
            },
          }}
        />
      </TableContainer>
    </>
  );
}

export default RoomReservationReport;
