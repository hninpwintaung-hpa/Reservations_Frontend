import React from "react";
import "./DataTable.css";

import { ReservationData, RoomData, TeamData, UserData } from "./room";

interface DataTableProps {
  rooms: RoomData[];
  reservationData: ReservationData[];
  teamData: TeamData[];
  userData: UserData[];
}

const ReservationsDataTable: React.FC<DataTableProps> = ({
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
      const cells = Array(8).fill(null);

      for (let j = 0; j < data.length; j++) {
        const cell = data[j];
        const start = cell.start_time - 9;
        const end = cell.end_time - 9;
        const user = userData.find((user) => user.id === cell.user_id);
        const team = teamData.find((team) => team.id === user?.team_id);
        const teamName = team ? team.name : "";

        for (let k = start; k < end; k++) {
          cells[k] = (
            <td
              key={`${cell.id}-${k}`}
              style={{ backgroundColor: "rgb(251, 177, 74)" }}
              className="tooltip yellow"
            >
              <span>{k === start ? cell.title : ""}</span>
              <span className="tooltiptext">
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <span>Team :</span> {teamName}
                  </li>
                  <li>
                    <span>Title :</span> {cell.title}
                  </li>
                  <li>
                    <span>Agenda:</span> {cell.description}
                  </li>
                </ul>
              </span>
            </td>
          );
        }
      }

      tableData.push(
        <tr key={room}>
          <td>{room_name}</td>
          {cells.map((cell, index) => (
            <td key={index}>{cell}</td>
          ))}
        </tr>
      );
    }

    return tableData;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>9 AM - 10 AM</th>
            <th>10 AM - 11 AM</th>
            <th>11 AM - 12 PM</th>
            <th>12 PM - 1 PM</th>
            <th>1 PM - 2 PM</th>
            <th>2 PM - 3 PM</th>
            <th>3 PM - 4 PM</th>
            <th>4 PM - 5 PM</th>
          </tr>
        </thead>
        <tbody>{generateTableData()}</tbody>
      </table>
    </div>
  );
};

export default ReservationsDataTable;
