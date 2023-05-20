import React, { useContext, useState } from "react";
import { Button, Switch, Dialog, DialogContent } from "@mui/material";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

interface DataRow {
  emp_id: string;
  name: string;
  email: string;
  role: string;
  phone_no: string;
  status: boolean ;
}

function ProUser(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<DataRow>({
    emp_id: "",
    name: "",
    email: "",
    role: "",
    phone_no: "",
    status: true,
  });
  const [data, setData] = useState<DataRow[]>([
    {
      emp_id: "ACE-234",
      name: "admin",
      email: "admin@gmail.com",
      role: "Admin",
      phone_no: "09777888666",
      status: true,
    },
  ]);

  const handleEdit = (row: DataRow) => {
    setFormValues(row);
    setOpen(true);
  };

  const handleDelete = (row: DataRow) => {
    const updatedData = data.filter((item) => item.emp_id !== row.emp_id);
    setData(updatedData);
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const updatedData: DataRow[] = data.map((row) => {
      if (row.emp_id === formValues.emp_id) {
        return {
          ...row,
          emp_id: formValues.emp_id,
          name: formValues.name,
          email: formValues.email,
          role: formValues.role,
          phone_no: formValues.phone_no,
          status: formValues.status
          
        };
      }
      return row;
    });
    setData(updatedData);
    console.log(setData);
    setOpen(false);
    navigate("/user/pro-user");
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const columns = [
    {
      name: "Emp_id",
      selector: (row: DataRow) => row.emp_id,
    },
    {
      name: "Name",
      selector: (row: DataRow) => row.name,
    },
    {
      name: "Email",
      selector: (row: DataRow) => row.email,
    },
    {
      name: "Role",
      selector: (row: DataRow) => row.role,
    },
    {
      name: "Phone_no",
      selector: (row: DataRow) => row.phone_no,
    },
    {
      name: "Status",
      cell: (row: DataRow) => <Switch checked={row.status} />,
    },
    {
      name: "Actions",
      cell: (row: DataRow) => (
        <>
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => handleEdit(row)}
              variant="contained"
              color="success"
              size="small"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(row)}
              variant="contained"
              color="error"
              size="small"
              sx={{ marginLeft: "5px" }}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={data}
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
          <label htmlFor="emp_id">Emp_id:</label>
          <input
            type="text"
            name="emp_id"
            value={formValues.emp_id}
            onChange={handleFormChange}
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleFormChange}
          />
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            name="role"
            value={formValues.role}
            onChange={handleFormChange}
          />
          <label htmlFor="phone_no">Phone_no:</label>
          <input
            type="number"
            name="phone_no"
            value={formValues.phone_no}
            onChange={handleFormChange}
          />
          <label htmlFor="status">Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={formValues.status}
            onChange={handleFormChange}
          />

          <div>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              size="small"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProUser;
