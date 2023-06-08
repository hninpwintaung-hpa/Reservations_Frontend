/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Paper,
  TableContainer,
} from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { useRoomListDataQuery } from "../api/api";
import ReactLoading from "react-loading";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { AuthRole } from "./redux/features/type/authType";

export interface RoomData {
  name: string;
  capacity: number;
  amenities: string;
  id: number;
}

function AdminRoomComponent(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [room, setRoom] = useState<RoomData[]>([]);
  const [, setIsUpdated] = useState(false);
  const [nameError, setNameError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(Number);
  const [formValues, setFormValues] = useState<RoomData>({
    name: "",
    capacity: 1,
    amenities: "",
    id: 0,
  });

  const authRedux = useAppSelector((state) => state.auth);
  const { data: roomDataQuery, isFetching: isRoomFetching } =
    useRoomListDataQuery();
  useEffect(() => {
    if (roomDataQuery && !isRoomFetching) {
      setRoom(roomDataQuery.data);
      setIsUpdated(true);
    }
  }, [roomDataQuery, isRoomFetching]);

  const handleEdit = (row: RoomData) => {
    setFormValues({ ...row });
    setOpenUpdate(true);
    setCapacityError("");
    setNameError("");
  };

  const handleUpdate = () => {
    setCapacityError("");
    setNameError("");
    const updatedRoom: RoomData = {
      ...formValues,
    };

    return new Promise<void>((resolve, reject) => {
      axios
        .patch(
          `http://127.0.0.1:8000/api/rooms/${formValues.id}`,
          {
            name: updatedRoom.name,
            capacity: updatedRoom.capacity,
            amenities: updatedRoom.amenities,
          },
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then(() => {
          const updatedRooms = room.map((item) =>
            item.id === formValues.id ? updatedRoom : item
          );
          // setUser(updatedUsers);
          setRoom(updatedRooms);
          setOpenUpdate(false);
          setIsUpdated(true);
          setCapacityError("");
          setNameError("");
        })
        .catch((error) => {
          setOpenUpdate(true);
          if (error.response.data.message.name) {
            setNameError(error.response.data.message.name);
          }
          if (error.response.data.message.capacity) {
            setCapacityError(error.response.data.message.capacity);
          }
        });
    });
  };

  // const handleDelete = (row: number) => {
  //   return new Promise<void>((resolve, reject) => {
  //     axios
  //       .delete(`http://127.0.0.1:8000/api/rooms/${row}`, {
  //         headers: {
  //           Authorization: `Bearer ${authRedux.token}`,
  //         },
  //       })
  //       .then(() => {
  //         setRoom((prev) => prev.filter((item) => item.id !== row));
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    //console.log(formValues);
  };

  const columns: TableColumn<RoomData>[] = [
    {
      name: "Name",
      selector: (row: RoomData) => row.name,
    },
    {
      name: "Capacity",
      selector: (row: RoomData) => row.capacity,
    },

    {
      name: "Amenity",
      selector: (row: RoomData) => row.amenities,
    },
    {
      name: "Actions",
      cell: (row: RoomData) => (
        <>
          <div style={{ display: "flex" }}>
            <DriveFileRenameOutlineTwoToneIcon
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
              sx={{ marginLeft: "5px" }}
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
    setDeleteDialog(true);
    setDeleteItem(row);
  };
  const handleDeleteRoom = () => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/rooms/${deleteItem}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setDeleteDialog(false);
          setRoom((prev) => prev.filter((item) => item.id !== deleteItem));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  function handleAdd() {
    setAddOpen(!addOpen);
    setNameError("");
    setCapacityError("");
  }

  function handleSave() {
    return new Promise<void>((reject) => {
      axios
        .post(
          "http://127.0.0.1:8000/api/rooms",
          {
            name: formValues.name,
            capacity: formValues.capacity,
            amenities: formValues.amenities,
          },
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
        .then(() => {
          setNameError("");
          setCapacityError("");
          setAddOpen(!addOpen);
          window.location.reload();
        })
        .catch((error) => {
          setOpen(true);
          if (error.response.data.message.name) {
            setNameError(error.response.data.message.name);
          }
          if (error.response.data.message.capacity) {
            setCapacityError(error.response.data.message.capacity[0]);
          }
        });
    });
  }
  const onBackDropClick = () => {
    setAddOpen(false);
    setOpenUpdate(false);
    setNameError("");
    setCapacityError("");
  };

  return (
    <>
      {isRoomFetching ? (
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
          <div style={{ marginLeft: "13px" }}>
            <Button
              className={darkMode ? "dark_btn" : ""}
              style={{ margin: "0px 15px 15px 0px" }}
              variant="contained"
              color="primary"
              size="medium"
              onClick={(e: any) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              Add New Room
            </Button>
          </div>
          <TableContainer component={Paper} style={{ maxWidth: 1300 }}>
            <DataTable
              columns={columns}
              className={darkMode ? "darkTable" : ""}
              data={room}
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
          <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <DialogContent>
              <div className="form">
                <h1>Update Room </h1>
                <form>
                  <div className="elem-group">
                    <label htmlFor="name">
                      Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  {nameError && <div className="errorMessage">{nameError}</div>}
                  <div className="elem-group">
                    <label htmlFor="capacity">
                      Capacity<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formValues.capacity}
                      onChange={handleFormChange}
                    />
                  </div>
                  {capacityError && (
                    <div className="errorMessage">{capacityError}</div>
                  )}

                  <div className="elem-group">
                    <label htmlFor="amenities">Amenity</label>
                    <input
                      type="string"
                      name="amenities"
                      value={formValues.amenities}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="button-group">
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

          <Dialog open={addOpen} onClose={() => setAddOpen(!addOpen)}>
            <DialogContent>
              <div className="form">
                <h1>Add New Car</h1>
                <form>
                  <div className="elem-group">
                    <label htmlFor="name">
                      Name<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleFormChange}
                    />
                  </div>
                  {nameError && <div className="errorMessage">{nameError}</div>}
                  <div className="elem-group">
                    <label htmlFor="capacity">
                      Capacity<span style={{ color: "red" }}>*</span> :
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      onChange={handleFormChange}
                    />
                  </div>
                  {capacityError && <div>{capacityError}</div>}
                  <div className="elem-group">
                    <label htmlFor="amenities">Amenity</label>
                    <input
                      type="string"
                      name="amenities"
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="btn-group">
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Save
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
            open={openDeleteDialog}
            onClose={() => setDeleteDialog(false)}
            className="dialog"
          >
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete?
              </DialogContentText>
            </DialogContent>

            <div style={{ marginBottom: "10px" }}>
              <Button
                variant="contained"
                color="info"
                onClick={handleDeleteRoom}
                style={{ textAlign: "center", fontSize: "13px" }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "gray", marginLeft: "10px" }}
                onClick={() => setDeleteDialog(false)}
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

export default AdminRoomComponent;
