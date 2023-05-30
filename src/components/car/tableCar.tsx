import Button from "@mui/material/Button/Button";
import DataTable, { TableColumn } from "react-data-table-component";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAppSelector } from "../../redux/features/Hook";
import axios from "axios";

interface DataRow {
  car: { id: number; licence_no: string; brand: string };
  date: string;
  title: string;
  carno: string;
  destination: string;
  no_of_traveller: string;
  start_time: string;
  end_time: string;
  status: boolean;
  user: { id: number; name: string; team: { id: number; name: string } };
}
interface TableProps {
  date: string;
}
const TableCar: React.FC<TableProps> = ({ date }) => {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<DataRow[]>([]);

  useEffect(() => {
    getCarReservationData().then((response: any) => {
      setUser(response.data);
    });
  }, [date]);

  const getCarReservationData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://localhost:8000/api/getCarReservationSearchByDate/${date}`,
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const columns = [
    {
      name: "Date",
      selector: (row: DataRow) => row.date,
    },
    {
      name: "Brand",
      selector: (row: DataRow) => row.car.brand,
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
      name: "Start Time",
      selector: (row: DataRow) => row.start_time,
    },
    {
      name: "End Time",
      selector: (row: DataRow) => row.end_time,
    },
    {
      name: "Request User",
      selector: (row: DataRow) => row.user.name,
    },
    {
      name: "Team Name",
      cell: (row: DataRow) => row.user.team.name,
    },
    {
      name: "Status",
      cell: (row: DataRow) =>
        row.status == true ? (
          <Button color="success">Success</Button>
        ) : (
          <Button color="warning">Pending</Button>
        ),
    },
  ];
  return (
    <DataTable
      columns={columns}
      className={darkMode ? "darkTable" : ""}
      data={user}
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
  );
};

export default TableCar;
