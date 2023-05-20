import React from "react";
import "./DataTable.css";
import { ReservationData, RoomData, TeamData, UserData } from "./room";

interface DataTableProps {
  rooms: RoomData[];
  reservationData: ReservationData[];
  teamData: TeamData[];
  userData: UserData[];
}

const DataTable: React.FC<DataTableProps> = ({
  rooms,
  reservationData,
  teamData,
  userData,
}) => {
  const generateTableData = () => {
    const tableData: JSX.Element[] = [];

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i].id;
      const room_name = rooms[i].name;
      const data = reservationData.filter((data) => data.room_id === room);
      const cells = [];

      for (let j = 9; j <= 16; j++) {
        const cell = data.find(
          (data) => data.start_time <= j && data.end_time > j
        );

        //const isCellInRange = cell && cell.start_time <= j && cell.end_time > j;
        const isFirstCellInRange = cell && cell.start_time === j;

        if (isFirstCellInRange) {
          const user = userData.find((user) => user.id === cell.user_id);
          // const userName = user ? user.name : "";
          const team = teamData.find((team) => team.id === user?.team_id);
          const teamName = team ? team.name : "";
          const span = cell.end_time - cell.start_time;
          cells.push(
            <td
              key={j}
              style={{ backgroundColor: cell ? "gray" : "white" }}
              colSpan={span}
            >
              <span>
                {cell.title}({teamName})
              </span>
            </td>
          );
          j += span - 1;
        } else {
          cells.push(
            <td
              key={j}
              style={{ backgroundColor: cell ? "gray" : "white" }}
            ></td>
          );
        }
      }
      tableData.push(
        <tr key={room}>
          <td>{room_name}</td>
          {cells}
        </tr>
      );
    }

    return tableData;
  };
  console.log(userData);
  return (
    <table>
      <thead>
        <tr>
          <th>Room</th>
          {/* <th>9 AM</th>
          <th>10 AM</th>
          <th>11 AM</th>
          <th>12 PM</th>
          <th>1 PM</th>
          <th>2 PM</th>
          <th>3 PM</th>
          <th>4 PM</th>
          <th>5 PM</th> */}
          <th>9 AM - 10 AM</th>
          <th>10 AM - 11 AM</th>
          <th>11 AM - 12 PM</th>
          <th>12 PM - 1 PM</th>
          <th>1 PM - 2 PM </th>
          <th>2 PM - 3 PM</th>
          <th>3 PM - 4 PM</th>
          <th>4 PM - 5 PM</th>
        </tr>
      </thead>
      <tbody>{generateTableData()}</tbody>
    </table>
  );
};

export default DataTable;