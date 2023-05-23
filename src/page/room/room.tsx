import React, { useEffect, useState } from "react";
import ReservationsDataTable from "./ReservationsDataTable";
import { Sidebar } from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./roomStyles.scss";
import { useAppSelector } from "../../redux/features/Hook";
import { Link } from "react-router-dom";
import { Button, Card, Dialog, DialogContent } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";

export interface ReservationData {
  date: string;
  description: string;
  end_time: number;
  id: number;
  room_id: number;
  start_time: number;
  title: string;
  user_id: number;
}

export interface RoomData {
  id: number;
  name: string;
}

export interface TeamData {
  id: number;
  name: string;
}
export interface UserData {
  id: number;
  name: string;
  email: string;
  team_id: number;
}
interface Column {
  id:
    | "id"
    | "title"
    | "description"
    | "start_time"
    | "end_time"
    | "date"
    | "room_id"
    | "user_id";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: string | number | boolean | Date) => JSX.Element | string;
}
interface InputValue {
  start_time: string;
  end_time: string;
  room_id: number;
  title: string;
  description: string;
  date: string;
  user_id: number;
}

export const Room: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const authUser = authRedux.user;
  const [userData, setUserData] = useState<UserData[]>([]);
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [open, setOpen] = useState(false);
  const [userReservationData, setUserReservationData] = useState<
    ReservationData[]
  >([]);

  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [SearchByDateData, setSearchByDateData] = useState<ReservationData[]>(
    []
  );

  const initialInputValue: ReservationData = {
    id: 0,
    title: "",
    description: "",
    date: "",
    start_time: 0,
    end_time: 0,
    room_id: 1,
    user_id: 1,
  };

  const [inputValues, setInputValues] = useState(initialInputValue);

  useEffect(() => {
    getRoomData();
    getTeamData().then((response: any) => {
      setTeamData(response.data);
    });
    getUserData().then((response: any) => {
      setUserData(response.data);
    });
    getUserReservationData();
  }, []);

  useEffect(() => {
    handleSearchByDate();
  }, [searchDate]);

  const handleSearchByDate = async () => {
    try {
      const requestBody = {
        date: searchDate,
      };

      const response = await axios.post(
        "http://localhost:8000/api/room_reservation/searchByDate",
        requestBody
      );
      if (Array.isArray(response.data.data)) {
        const data: ReservationData[] = response.data.data.map((item: any) => ({
          title: item.title,
          description: item.description,
          room_id: item.room_id,
          start_time: Number(item.start_time.split(":")[0]),
          end_time: Number(item.end_time.split(":")[0]),
          date: item.date,
          user_id: item.user_id,
        }));
        setSearchByDateData(data);
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/rooms");
      setRoomData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/teams")
        .then((response) => {
          resolve(response.data);
          //console.log(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  //console.log(teamData);
  const getUserData = () => {
    const API_URL = "http://localhost:8000/api/users";
    const authToken = authRedux.token;

    return new Promise((resolve, reject) => {
      axios
        .get(API_URL, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        .then((response) => {
          resolve(response.data);
          // console.log(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getUserReservationData = async () => {
    try {
      const url = `http://localhost:8000/api/room_reservation/searchByUserAndDate/${authUser.id}`;
      const response = await axios.get(url);
      setUserReservationData(response.data.data);
      //console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const rows: ReservationData[] = userReservationData.map((item) =>
    createData(
      item.id,
      item.title,
      item.description,
      item.date,
      item.start_time,
      item.end_time,
      roomData.map((rm) => {
        if (item.room_id == rm.id) {
          return rm.name;
        }
      }),

      userData.map((usr) => {
        if (item.user_id == usr.id) {
          return usr.name;
        }
      })
    )
  );
  //console.log(user);

  function createData(
    id: number,
    title: string,
    description: string,
    date: string,
    start_time: number,
    end_time: number,
    room_id: any,
    user_id: any
  ): ReservationData {
    return {
      id,
      title,
      description,
      date,
      start_time,
      end_time,
      room_id,
      user_id,
    };
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    // inputValues["user_id"] = authUser;
    console.log(inputValues);
    sendDataToBackend({ inputValues });
    setOpen(false);
    // resetForm();
  };
  const resetForm = () => {
    setInputValues(initialInputValue);
  };
  const sendDataToBackend = (data: { inputValues: ReservationData }) => {
    fetch(`http://127.0.0.1:8000/api/room_reservation/${inputValues.id}`, {
      method: "PATCH",
      body: JSON.stringify(inputValues),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const columns: TableColumn<ReservationData>[] = [
    {
      name: "Date",
      selector: (row: ReservationData) => row.date,
    },
    {
      name: "Title",
      selector: (row: ReservationData) => row.title,
    },
    {
      name: "Description",
      selector: (row: ReservationData) => row.description,
    },
    {
      name: "Start_time",
      selector: (row: ReservationData) => row.start_time,
    },
    {
      name: "Phone_no",
      selector: (row: ReservationData) => row.end_time,
    },

    {
      name: "Actions",
      cell: (row: ReservationData) => (
        <>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e: any) => {
                e.preventDefault();
                handleEdit(row);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ marginLeft: "5px" }}
              onClick={(e: any) => {
                e.preventDefault();
                handleDelete(row.id);
              }}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];
  const handleEdit = (data: ReservationData) => {
    setInputValues({ ...data });
    setOpen(true);
  };
  const handleDelete = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/room_reservation/${id}`)
        .then(() => {
          setUserReservationData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return (
    <div className="home">
      <Sidebar />{" "}
      <div className="homeContainer">
        <Navbar />

        {/* <RoomReservationList /> */}
        <div className="reservation-container">
          <h1>Meeting Rooms Schedule</h1>

          <div className="date">
            <div className="date__reservationBtn">
              <Link to="/another-page" className="link-style">
                Reserve Room
              </Link>
            </div>
            {/* <h3>Sunday 21 May 2023</h3> */}
            {/* <div>My Reservations</div> */}
            <div className="date__dateFilter">
              <label>Data Show By Date : &nbsp;</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>

          <ReservationsDataTable
            rooms={roomData}
            reservationData={SearchByDateData}
            teamData={teamData}
            userData={userData}
          />
          <div>
            <h1>Your Reservation for Today</h1>
            <DataTable
              columns={columns}
              //className={darkMode ? "darkTable" : ""}
              data={userReservationData}
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
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <div className="elem-group">
                      <label htmlFor="room">Room</label>
                      <select
                        name="room_id"
                        value={inputValues.room_id}
                        onChange={handleSelectChange}
                      >
                        {roomData.map((roomData) => (
                          <option key={roomData.id} value={roomData.id}>
                            {roomData.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="elem-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={inputValues.title}
                        onChange={handleInputChange}
                        placeholder="To meet with the client"
                      />
                    </div>

                    <div className="elem-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        name="description"
                        value={inputValues.description}
                        onChange={handleInputChange}
                        placeholder="Agenda"
                        required
                      />
                    </div>

                    <div className="elem-group inlined">
                      <select
                        name="start_time"
                        value={inputValues.start_time}
                        onChange={handleSelectChange}
                      >
                        <option value="9:00:00">09:00am</option>
                        <option value="10:00:00">10:00am</option>
                        <option value="11:00:00">11:00am</option>
                        <option value="12:00:00">12:00pm</option>
                        <option value="13:00:00">01:00pm</option>
                        <option value="14:00:00">02:00pm</option>
                        <option value="15:00:00">03:00pm</option>
                        <option value="16:00:00">04:00pm</option>
                      </select>
                    </div>
                    <div className="elem-group inlined">
                      <select
                        name="end_time"
                        value={inputValues.end_time}
                        onChange={handleSelectChange}
                      >
                        <option value="10:00:00">10:00am</option>
                        <option value="11:00:00">11:00am</option>
                        <option value="12:00:00">12:00pm</option>
                        <option value="13:00:00">01:00pm</option>
                        <option value="14:00:00">02:00pm</option>
                        <option value="15:00:00">03:00pm</option>
                        <option value="16:00:00">04:00pm</option>
                        <option value="17:00:00">05:00pm</option>
                      </select>
                    </div>
                    <div className="elem-group">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={inputValues.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button type="submit">Update</button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
