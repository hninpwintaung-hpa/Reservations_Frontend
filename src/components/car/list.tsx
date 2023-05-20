import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
interface Column {
  id:
    | "id"
    | "carno"
    | "destination"
    | "team_name"
    | "started_time"
    | "ended_time"
    | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | number | boolean | Date) => JSX.Element | string; // Update the parameter type to include Date
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "carno", label: "Carno", minWidth: 100 },
  {
    id: "destination",
    label: "destination",
    minWidth: 170,
    align: "right",
    format: (value: string | number | boolean | Date) =>
      value.toLocaleString("en-US"),
  },
  {
    id: "team_name",
    label: "Team_Name",
    minWidth: 170,
    align: "right",
    format: (value: string | number | boolean | Date) =>
      value.toLocaleString("en-US"),
  },
  {
    id: "started_time",
    label: "Started_time",
    minWidth: 170,
    align: "right",
    format: (value: string | number | boolean | Date) => {
      const time = value as string;
      const [hours, minutes, seconds] = time.split(":");
      return `${hours.padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )}:${seconds.padStart(2, "0")}`;
    },
  },
  {
    id: "ended_time",
    label: "Ended_time",
    minWidth: 170,
    align: "right",
    format: (value: string | number | boolean | Date) => {
      const time = value as string;
      const [hours, minutes, seconds] = time.split(":");
      return `${hours.padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )}:${seconds.padStart(2, "0")}`;
    },
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value: string | number | boolean | Date) => {
        const isActive = value === true || value === "true";
        const statusText = isActive === true ? "Success" : "Pending";
        const statusColor = isActive ? "success" : "warning";
        return (
          <Button variant="contained" color={statusColor}>
            {statusText}
          </Button>
        );
      },
  },
];
interface Data {
  id: number;
  carno: string;
  destination: string;
  team_name: string;
  started_time: string;
  ended_time: string;
  status: boolean | string;
}

function createData(
  id: number,
  carno: string,
  destination: string,
  team_name: string,
  started_time: string,
  ended_time: string,
  status: boolean | string
): Data {
  return {
    id,
    carno,
    destination,
    team_name,
    started_time,
    ended_time,
    status,
  };
}

const rows = [
  createData(1, "A54-2343", "InSein", "TeamA", "13:00:00", "14:00:00", true),
  createData(2, "A54-2234", "Hlaing", "TeamB", "11:00:00", "12:00:00", false),
];

export default function TableCar() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" , marginTop: "50px"}}>
      <TableContainer sx={{ maxHeight: 200}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow sx={{ fontWeight: 600 , fontSize:"35px"}}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof column.format === "function"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
