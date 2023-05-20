import React from "react";
import "./DataTable.css";

const DataTable1 = ({ rooms, cellData }) => {
  const generateTableData = () => {
    const tableData = [];

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const roomData = cellData.filter((data) => data.room_id === room);

      const cells = [];

      for (let j = 9; j <= 17; j++) {
        const cell = roomData.find(
          (data) => data.start_time <= j && data.end_time >= j
        );
        // console.log(cell);

        cells.push(
          <td key={j} style={{ backgroundColor: cell ? "yellow" : "white" }}>
            {cell && cell.start_time <= j && cell.end_time >= j && (
              <span>{cell.title}</span>
            )}
          </td>
        );
      }

      tableData.push(
        <tr key={room}>
          <td>{room}</td>
          {cells}
        </tr>
      );
    }

    return tableData;
  };
  //  console.log(cellData);
  return (
    <table>
      <thead>
        <tr>
          <th>Room</th>
          <th>9 am</th>
          <th>10 am</th>
          <th>11 am</th>
          <th>12 pm</th>
          <th>1 pm</th>
          <th>2 pm </th>
          <th>3 pm </th>
          <th>4 pm</th>
          <th>5 pm</th>
        </tr>
      </thead>
      <tbody>{generateTableData()}</tbody>
    </table>
  );
};

export default DataTable1;
