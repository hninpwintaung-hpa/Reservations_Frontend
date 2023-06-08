/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Switch,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactLoading from "react-loading";
import {
  useTeamDataQuery,
  useRoleDataQuery,
  useNormalQuery,
  useUserDataQuery,
} from "../api/api";

export interface DataRow {
  team: { id: number; name: string };
  employee_id: string;
  name: string;
  password: string;
  email: string;
  roles: [{ id: number; name: string }];
  phone: string;
  id: number;
  role_id: string;
  status: boolean;
  team_id: string;
}
export interface FormInputValue {
  employee_id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  id: number;
  role_id: string;
  status: boolean;
  team_id: string;
}
function NormalUser(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("");
  const [user, setUser] = useState<DataRow[]>([]);
  const [roleList, setRoleList] = useState<{ id: number; name: string }[]>([]);
  const [teamName, setTeamName] = useState("");
  const [teamList, setTeamList] = useState<{ id: number; name: string }[]>([]);
  const [, setIsUpdated] = useState(false);
  const [, setInitialLoading] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [deleteItem, setDeleteItem] = useState(Number);
  const [openUserDeleteDialog, setUserDeleteDialog] = useState(false);
  const [formValues, setFormValues] = useState<DataRow>({
    team: { id: 0, name: "" },
    employee_id: "",
    name: "",
    email: "",
    role_id: "",
    password: "",
    phone: "",
    status: true,
    roles: [{ id: 0, name: "" }],
    id: 0,
    team_id: "",
  });
  const authRedux = useAppSelector((state) => state.auth);

  const { data: userDataQuery, isFetching: isUserFetching } =
    useUserDataQuery();
  const { data: teamDataQuery, isFetching: isTeamFetching } =
    useTeamDataQuery();
  const { data: roleDataQuery, isFetching: isRoleFetching } =
    useRoleDataQuery();
  useEffect(() => {
    if (userDataQuery) {
      setInitialLoading(true);
      setUser(userDataQuery.data);
    }
  }, [userDataQuery, isUserFetching]);

  useEffect(() => {
    if (teamDataQuery && !isTeamFetching) {
      setTeamList(teamDataQuery.data);
      setIsUpdated(true);
    }
  }, [teamDataQuery, isTeamFetching]);

  useEffect(() => {
    if (roleDataQuery && !isRoleFetching) {
      setIsUpdated(true);
      setRoleList(roleDataQuery.data);
    }
  }, [roleDataQuery, isRoleFetching]);

  const handleUpdate = () => {
    const updatedUser: DataRow = {
      ...formValues,
      roles: [
        {
          id: parseInt(role, 10),
          name: roleList.find((r) => r.id === parseInt(role, 10))?.name || "",
        },
      ],

      team: {
        id: parseInt(teamName, 10),
        name: teamList.find((t) => t.id === parseInt(teamName, 10))?.name || "",
      },
    };
    const updatedUsers = user.map((item) =>
      item.id === formValues.id ? updatedUser : item
    );
    setUser(updatedUsers);
    window.location.reload();

    return new Promise<void>((resolve, reject) => {
      axios
        .patch(
          `http://127.0.0.1:8000/api/users/${formValues.id}`,
          {
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            status: updatedUser.status,
            team_id: updatedUser.team.id,
            phone: updatedUser.phone,
            employee_id: updatedUser.employee_id,
            role_id: updatedUser.roles[0].id,
          },
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then(() => {
          setOpen(false);
          setIsUpdated(true);
          resolve();
        })
        .catch((error) => {
          reject(error);
          console.log(error);
          if (error.response.data.message) {
            setPermissionError(error.response.data.message);
          }
        });
    });
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: DataRow
  ) => {
    const { checked } = event.target;

    const updatedUser: DataRow = {
      ...row,
      status: checked,
    };
    axios
      .patch(
        `http://127.0.0.1:8000/api/status_change/${row.id}`,
        {
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          status: checked,
          team_id: updatedUser.team.id,
          phone: updatedUser.phone,
          employee_id: updatedUser.employee_id,
          role_id: updatedUser.roles[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then(() => {
        const updatedUsers = user.map((item) =>
          item.id === row.id ? updatedUser : item
        );
        setUser(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "role_id") {
      setFormValues((prevValues) => ({
        ...prevValues,
        roles: [
          {
            id: parseInt(value, 10),
            name:
              roleList.find((r) => r.id === parseInt(value, 10))?.name || "",
          },
        ],
      }));
      setRole(value);
    }

    if (name === "team_id") {
      setTeamName(value);
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEdit = (row: DataRow) => {
    setFormValues({ ...row });
    setOpen(true);
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Employee Id",
      selector: (row: DataRow) => row.employee_id,
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
      selector: (row: DataRow) => row.roles[0].name,
      cell: (row: DataRow) => {
        return <span>{row.roles[0].name}</span>;
      },
    },
    {
      name: "Phone No",
      selector: (row: DataRow) => row.phone,
    },
    {
      name: "Team Name",
      selector: (row: DataRow) => row.team.name,
    },
    {
      name: "Status",
      cell: (row: DataRow) => (
        <Switch
          checked={Boolean(row.status)}
          onChange={(event) => handleStatusChange(event, row)}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row: DataRow) => (
        <>
          <div style={{ display: "flex" }}>
            <DriveFileRenameOutlineTwoToneIcon
              sx={{ cursor: "pointer" }}
              fontSize="large"
              color="success"
              onClick={(e: any) => {
                e.preventDefault();
                handleEdit(row);
              }}
            />
            <DeleteForeverIcon
              fontSize="large"
              color="error"
              sx={{ marginLeft: "5px", cursor: "pointer" }}
              onClick={(e: any) => {
                e.preventDefault();
                handleDelete(row.id);
              }}
            />
          </div>
        </>
      ),
    },
  ];

  const handleDelete = (row: number) => {
    setUserDeleteDialog(true);
    setDeleteItem(row);
  };
  const handleDeleteUser = () => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/users/${deleteItem}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setUserDeleteDialog(false);
          setUser((prevUser) =>
            prevUser.filter((item) => item.id !== deleteItem)
          );
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const onBackDropClick = () => {
    setOpen(false);
  };
  return (
    <>
      {isUserFetching || isRoleFetching || isTeamFetching ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactLoading
            color={"blue"}
            type={"spin"}
            height={"80px"}
            width={"80px"}
          />
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            className={darkMode ? "darkTable" : ""}
            data={user}
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
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
              <div className="form">
                <form>
                  <div className="elem-group">
                    <label htmlFor="team">RoleName::</label>
                    <div className="role">
                      <select
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          marginTop: "10px",
                          padding: "6px 0px",
                        }}
                        className="option"
                        name="role_id"
                        value={formValues.roles[0].id}
                        onChange={handleFormChange}
                      >
                        {roleList.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {permissionError && (
                      <div className="errorMessage">{permissionError}</div>
                    )}
                  </div>
                  <div className="elem-group">
                    <label htmlFor="team">TeamName::</label>
                    <div className="team">
                      <select
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          marginTop: "10px",
                          padding: "6px 0px",
                        }}
                        name="team_id"
                        className="option"
                        value={formValues.team_id}
                        onChange={handleFormChange}
                      >
                        {teamList.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={handleUpdate}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={onBackDropClick}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openUserDeleteDialog}
            onClose={() => setUserDeleteDialog(false)}
            className="dialog"
          >
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>

            <div style={{ marginBottom: "10px" }}>
              <Button
                variant="contained"
                color="info"
                onClick={handleDeleteUser}
                style={{ textAlign: "center", fontSize: "13px" }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "gray", marginLeft: "10px" }}
                onClick={() => setUserDeleteDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}

export default NormalUser;
