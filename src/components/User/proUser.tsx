// import React, { useContext, useEffect, useState } from "react";
// import { Button, Switch, Dialog, DialogContent } from "@mui/material";
// import DataTable, { TableColumn } from "react-data-table-component";
// import { redirect, useNavigate } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import axios from "axios";
// import { useAppSelector } from "../../redux/features/Hook";
// // import { AuthRole } from "./redux/features/type/authType";
// import { data } from "../card/card";
// import { Email } from "@mui/icons-material";
// import { userData } from "../dashboard_table/AdminCarReserveTable";
// interface DataRow {
//   team: { id: number; name: string }[];
//   employee_id: string;
//   name: string;
//   password: string;
//   email: string;
//   roles: { id: number; name: string }[];
//   phone: string;
//   id: string;
//   role_id: string;
//   status: boolean;
// }

// function ProUser(): JSX.Element {
//   const { darkMode } = useContext(DarkModeContext);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState<DataRow[]>([]);
//   const [role, setRole] = useState<string>("");
//   const [user, setUser] = useState<DataRow[]>([]);
//   const [roleList, setRoleList] = useState<{ id: number; name: string }[]>([]);
//   const [teamName, setTeamName] = useState("");
//   const [teamList, setTeamList] = useState<{ id: number; name: string }[]>([]);
//   const [isUpdated, setIsUpdated] = useState(false);
//   // const [roleNames, setRoleNames] = useState<{ [key: number]: string }>({});
//   const [formValues, setFormValues] = useState<DataRow>({
//     employee_id: "",
//     name: "",
//     email: "",
//     team: [],
//     roles: [],
//     role_id: "",
//     password: "",
//     phone: "",
//     status: true,
//     id: "",
//     // phone_no: "",
//   });
//   const authRedux = useAppSelector((state) => state.auth);
//   useEffect(() => {
//     getUserData().then((response: any) => {
//       setIsUpdated(false);
//       setUser(response.data);
//     });
//   }, [isUpdated]);
//   useEffect(() => {
//     getTeamData().then((response: any) => {
//       setTeamList(response.data);
//     });
//   }, [authRedux.token]);
//   const getTeamData = () => {
//     return new Promise((resolve, reject) => {
//       axios
//         .get("http://127.0.0.1:8000/api/teams", {
//           headers: {
//             Authorization: `Bearer ${authRedux.token}`,
//           },
//         })
//         .then((response) => {
//           // setTeamList(response.data.team);
//           // console.log(response.data);
//           resolve(response.data);
//         })
//         .catch((reason) => {
//           reject(reason);
//         });
//     });
//   };
//   useEffect(() => {
//     getRoleData().then((response: any) => {
//       // console.log(response.data);
//       setRoleList(response.data);
//     });
//   }, [authRedux.token]);
//   const getRoleData = () => {
//     return new Promise((resolve, reject) => {
//       axios
//         .get("http://127.0.0.1:8000/api/roles", {
//           headers: {
//             Authorization: `Bearer ${authRedux.token}`,
//           },
//         })
//         .then((response) => {
//           // setTeamList(response.data.team);
//           // console.log(response.data);
//           resolve(response.data);
//         })
//         .catch((reason) => {
//           reject(reason);
//         });
//     });
//   };

//   const getUserData = () => {
//     return new Promise((resolve, reject) => {
//       axios
//         .get("http://127.0.0.1:8000/api/pro_user", {
//           headers: {
//             Authorization: `Bearer ${authRedux.token}`,
//           },
//         })
//         .then((response) => {
//           console.log(response.data);
//           setUserData(response.data);
//           // setTeamList(response.data.team);
//           resolve(response.data);
//         })
//         .catch((reason) => {
//           reject(reason);
//         });
//     });
//   };
//   const handleEdit = (row: DataRow) => {
//     setFormValues({ ...row });
//     setOpen(true);
//   };
//   const handleUpdate = () => {
//     const updatedUser: DataRow = {
//       ...formValues,
//       roles: [
//         {
//           id: parseInt(role, 10),
//           name: roleList.find((r) => r.id === parseInt(role, 10))?.name || "",
//         },
//       ],
//       team: [
//         {
//           id: parseInt(teamName, 10),
//           name:
//             teamList.find((t) => t.id === parseInt(teamName, 10))?.name || "",
//         },
//       ],
//     };

//     return new Promise<void>((resolve, reject) => {
//       axios
//         .patch(
//           `http://127.0.0.1:8000/api/users/${formValues.id}`,
//           {
//             name: updatedUser.name,
//             email: updatedUser.email,
//             password: updatedUser.password,
//             status: updatedUser.status,
//             team_id: updatedUser.team[0].id,
//             phone: updatedUser.phone,
//             employee_id: updatedUser.employee_id,
//             role_id: updatedUser.team[0].id,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${authRedux.token}`,
//             },
//           }
//         )
//         .then(() => {
//           const updatedUsers = user.map((item) =>
//             item.id === formValues.id ? updatedUser : item
//           );
//           // setUser(updatedUsers);
//           setUser(updatedUsers);
//           setOpen(false);
//           setIsUpdated(true);
//           resolve();
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };

//   const handleDelete = (row: number) => {
//     return new Promise<void>((resolve, reject) => {
//       axios
//         .delete(`http://127.0.0.1:8000/api/users/admin_delete/${row}`, {
//           headers: {
//             Authorization: `Bearer ${authRedux.token}`,
//           },
//         })
//         .then(() => {
//           setUser((prevUser) => prevUser.filter((item) => item.id !== row));
//           resolve();
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };

//   // const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//   //   e.preventDefault();
//   //   const updatedData: DataRow[] = data.map((row) => {
//   //     if (row.emp_id === formValues.emp_id) {
//   //       return {
//   //         ...row,
//   //         emp_id: formValues.emp_id,
//   //         name: formValues.name,
//   //         email: formValues.email,
//   //         role: formValues.role,
//   //         phone_no: formValues.phone_no,
//   //         status: formValues.status

//   //       };
//   //     }
//   //     return row;
//   //   });
//   // setData(updatedData);
//   // console.log(setData);
//   //   setOpen(false);
//   //   navigate("/user/pro-user");
//   // };
//   const handleStatusChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     row: DataRow
//   ) => {
//     const { checked } = event.target;

//     const updatedUser: DataRow = {
//       ...row,
//       status: checked,
//     };
//     axios
//       .patch(
//         `http://127.0.0.1:8000/api/status_change/${row.id}`,
//         {
//           name: updatedUser.name,
//           email: updatedUser.email,
//           password: updatedUser.password,
//           status: checked,
//           team_id: updatedUser.team?.id,
//           phone: updatedUser.phone,
//           employee_id: updatedUser.employee_id,
//           role_id: updatedUser.roles[0]?.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authRedux.token}`,
//           },
//         }
//       )
//       .then(() => {
//         const updatedUsers = user.map((item) =>
//           item.id === row.id ? updatedUser : item
//         );
//         setUser(updatedUsers);
//       })
//       .catch((error) => {
//         // console.log(updatedUser.team[0].id.valueOf());
//         console.error("Error updating user status:", error);
//       });
//   };

//   const handleFormChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     row: DataRow
//   ) => {
//     const { name, value, type, checked } = event.target;
//     const newValue = type === "checkbox" ? checked : value;

//     if (name === "roles") {
//       const updatedRoles = [
//         {
//           id: formValues.roles[0].id,
//           name: newValue.toString(),
//         },
//       ];

//       setFormValues((prevValues) => ({
//         ...prevValues,
//         roles: updatedRoles,
//       }));
//     }
//     // console.log(formValues.roles[0].id);
//     if (name === "team") {
//       const updatedTeam = [
//         {
//           id: formValues.team[0].id,
//           name: newValue.toString(),
//         },
//       ];

//       setFormValues((prevValues) => ({
//         ...prevValues,
//         team: updatedTeam,
//       }));
//     } else {
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         [name]: newValue,
//       }));
//     }
//   };

//   const columns: TableColumn<DataRow>[] = [
//     {
//       name: "Emp_id",
//       selector: (row: DataRow) => row.employee_id,
//     },
//     {
//       name: "Name",
//       selector: (row: DataRow) => row.name,
//     },
//     {
//       name: "Email",
//       selector: (row: DataRow) => row.email,
//     },
//     {
//       name: "Role",
//       selector: (row: DataRow) => row.roles[0].name,
//       cell: (row: DataRow) => {
//         // const roleNames = row.roles.map((role) => role.name).join(", ");
//         return <span>{row.roles[0].name}</span>;
//       },
//     },
//     {
//       name: "Phone_no",
//       selector: (row: DataRow) => row.phone,
//     },
//     {
//       name: "Team_Name",
//       // selector: (row: DataRow) => row.team,
//       cell: (row: DataRow) => <span>{row.team.name}</span>,
//     },
//     {
//       name: "Status",
//       cell: (row: DataRow) => (
//         <Switch
//           checked={Boolean(row.status)}
//           onChange={(event) => handleStatusChange(event, row)}
//         />
//       ),
//     },
//     {
//       name: "Actions",
//       cell: (row: DataRow) => (
//         <>
//           <div style={{ display: "flex" }}>
//             <Button
//               variant="contained"
//               color="success"
//               size="small"
//               onClick={(e: any) => {
//                 e.preventDefault();
//                 handleEdit(row);
//               }}
//             >
//               Edit
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               size="small"
//               sx={{ marginLeft: "5px" }}
//               onClick={(e: any) => {
//                 e.preventDefault();
//                 handleDelete(row.id);
//               }}
//             >
//               Delete
//             </Button>
//           </div>
//         </>
//       ),
//     },
//   ];
//   // console.log();
//   return (
//     <>
//       <DataTable
//         columns={columns}
//         className={darkMode ? "darkTable" : ""}
//         data={user}
//         theme="solarized"
//         pagination
//         customStyles={{
//           table: {
//             style: {
//               backgroundColor: "#000",
//             },
//           },
//         }}
//       />
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogContent>
//           {/* <label htmlFor="employee_id">Emp_id:</label>
//           <input
//             type="text"
//             name="employee_id"
//             value={formValues.employee_id}
//             onChange={handleFormChange}
//           disabled/> */}
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formValues.name}
//             onChange={handleFormChange}
//           />
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formValues.email}
//             onChange={handleFormChange}
//           />
//           {/* <label htmlFor="roles">Role:</label>
//           <input
//             type="text"
//             name="roles"
//             // key={formValues.roles[0].id}
//             value={
//               formValues.roles.length > 0
//                 ? formValues.roles[0].name || formValues.roles[0].id
//                 : ""
//             }
//             // value="hello"
//             onChange={handleFormChange}
//           /> */}
//           <div className="role">
//             <select
//               className="option"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               {roleList.map((role) => (
//                 <option key={role.id} value={role.id}>
//                   {role.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <label htmlFor="phone">Phone_no:</label>
//           <input
//             type="number"
//             name="phone"
//             value={formValues.phone}
//             onChange={handleFormChange}
//           />
//           {/* <label htmlFor="team">TeamName:</label>
//           <input
//             type="text"
//             name="team"
//             value={formValues.team.name}
//             // value={formValues.team[0].name}
//             onChange={handleFormChange}
//           /> */}
//           <div className="team">
//             <select
//               className="option"
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//             >
//               {teamList &&
//                 teamList.map((team) => (
//                   <option key={team.id} value={team.id}>
//                     {team.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <label htmlFor="status">Status:</label>
//           <input
//             type="checkbox"
//             name="status"
//             checked={formValues.status}
//             onChange={handleFormChange}
//           />

//           <div>
//             <Button
//               onClick={handleUpdate}
//               variant="contained"
//               color="primary"
//               size="small"
//             >
//               Update
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default ProUser;
import React, { useContext, useEffect, useState } from "react";
import { Button, Switch, Dialog, DialogContent } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactLoading from "react-loading";
import {
  useUserDataQuery,
  useTeamDataQuery,
  useRoleDataQuery,
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
function ProUser(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("");
  const [user, setUser] = useState<DataRow[]>([]);
  const [roleList, setRoleList] = useState<{ id: number; name: string }[]>([]);
  const [teamName, setTeamName] = useState("");
  const [teamList, setTeamList] = useState<{ id: number; name: string }[]>([]);
  const [, setIsUpdated] = useState(false);
  const [, setInitialLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormInputValue>({
    employee_id: "",
    name: "",
    email: "",
    role_id: "",
    password: "",
    phone: "",
    status: true,
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
  }, [userDataQuery]);

  useEffect(() => {
    if (teamDataQuery) {
      setTeamList(teamDataQuery.data);
      setIsUpdated(true);
    }
  }, [teamDataQuery]);

  useEffect(() => {
    if (roleDataQuery) {
      setIsUpdated(true);
      setRoleList(roleDataQuery.data);
    }
  }, [roleDataQuery]);

  // const handleUpdate = () => {
  //   const updatedUser: DataRow = {
  //     ...formValues,
  //     roles: [
  //       {
  //         id: parseInt(role, 10),
  //         name: roleList.find((r) => r.id === parseInt(role, 10))?.name || "",
  //       },
  //    ],

  //     team: {
  //       id: parseInt(teamName, 10),
  //       name: teamList.find((t) => t.id === parseInt(teamName, 10))?.name || "",
  //     },
  //   };
  //   const updatedUsers = user.map((item) =>
  //     item.id === formValues.id ? updatedUser : item
  //   );
  //   setUser(updatedUsers);
  //   window.location.reload();

  //   return new Promise<void>((resolve, reject) => {
  //     axios
  //       .patch(
  //         `http://127.0.0.1:8000/api/users/${formValues.id}`,
  //         {
  //           name: updatedUser.name,
  //           email: updatedUser.email,
  //           password: updatedUser.password,
  //           status: updatedUser.status,
  //           team_id: updatedUser.team.id,
  //           phone: updatedUser.phone,
  //           employee_id: updatedUser.employee_id,
  //           role_id: updatedUser.roles[0].id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authRedux.token}`,
  //           },
  //         }
  //       )
  //       .then(() => {
  //         setOpen(false);
  //         setIsUpdated(true);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };

  const handleDelete = (row: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/users/${row}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setUser((prevUser) => prevUser.filter((item) => item.id !== row));
          resolve();
        })
        .catch((error) => {
          reject(error);
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
          role_id: updatedUser.id,
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
      console.log(value);
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
      name: "Emp_id",
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
      name: "Phone_no",
      selector: (row: DataRow) => row.phone,
    },
    {
      name: "Team_Name",
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
  console.log(user);
  // console.log(teamList);
  // console.log(teamDataQuery.data);
  const handleUpdateButton = () => {
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
        });
    });
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
            // theme="solarized"
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
                  value={formValues.role_id}
                  onChange={handleFormChange}
                  // onChange={(e) => setRole(e.target.value)}
                >
                  {roleList.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
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
                  // onChange={(e) => setTeamName(e.target.value)}
                >
                  {teamList.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Button
                  onClick={handleUpdateButton}
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
      )}
    </>
  );
}

export default ProUser;
