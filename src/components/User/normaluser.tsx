import Button from '@mui/material/Button/Button';
import Switch from '@mui/material/Switch/Switch';
import DataTable, { TableColumn} from 'react-data-table-component';
import { useContext } from "react";
import { DarkModeContext } from '../../context/darkModeContext';
// import { DarkModeContext } from "./path/to/darkModeContext";

interface DataRow {
    emp_id: string;
    name: string;
    email: string;
    phone: string | number;
    team_name:string;
    status: boolean;
    actions: JSX.Element | string
}

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Emp_id',
        selector: row => row.emp_id,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: 'Team_name',
      selector: row => row.team_name,
    },
    {
      name: 'Status',
      cell: (row) => <Switch checked={row.status}/>,
    },
    {
      name: 'Actions',
      cell: (row) => <Button onClick={() => handleDelete(row)} variant='contained' color='error'>Delete</Button>,
    },
];

const data: DataRow[] = [
  {
    emp_id: 'ACE-234',
    name: 'admin',
    email: 'admin@gmail.com',
    phone: '09777333444',
    team_name: 'TEAM A',
    status: true,
    actions:'delete',
  },
];

function NormalUser(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
    return <DataTable columns={columns} className={darkMode ? "darkTable" : ""} data={ data} theme="solarized" pagination customStyles={{
      table: {
        style: {
          backgroundColor: "#000",
        },
      },
    }}/>
}

export default NormalUser;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleDelete(_row: DataRow): void {
  throw new Error('Function not implemented.');
}
