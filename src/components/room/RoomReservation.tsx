import React, { useEffect, useState } from "react";
import ReservationsDataTable from "./ReservationsDataTable";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogContent } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";

export interface UserReservationData {
  date: string;
  description: string;
  end_time: number;
  id: number;
  room_id: number;
  start_time: number;
  title: string;
  user_id: number;
  room: { id: number; name: string };
  user: { id: number; name: string; team: { id: number; name: string } };
}
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
export const TimeFormatConverter = (time: number) => {
  const [hour, minutes] = time.toString().split(":");
  const date = new Date(0, 0, 0, Number(hour), Number(minutes));

  const twelveHourFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return twelveHourFormat.format(date);
};
export const RoomReservation: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const authUser = authRedux.user;

  const [roomData, setRoomData] = useState<RoomData[]>([]);

  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const [refresh, setRefresh] = useState(false);

  const [userReservationData, setUserReservationData] = useState<
    UserReservationData[]
  >([]);

  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [SearchByDateData, setSearchByDateData] = useState<
    UserReservationData[]
  >([]);

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
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  // console.log(currentTime);

  const getTimeFormat = (date: string) => {
    const [hours, minutes, seconds] = date.split(":");
    const time = new Date();
    time.setHours(Number(hours));
    time.setMinutes(Number(minutes));
    time.setSeconds(Number(seconds));
    return time;
  };

  useEffect(() => {
    getRoomData();
  }, []);
  useEffect(() => {
    getUserReservationData().then((response: any) => {
      setUserReservationData(response.data);
      //setRefresh(false);
    });
  }, [searchDate]);

  useEffect(() => {
    getDataSearchByDate();
  }, [searchDate]);

  useEffect(() => {
    handleFormSubmit;
  }, [searchDate]);

  const getDataSearchByDate = async () => {
    try {
      const requestBody = {
        date: searchDate,
      };

      const response = await axios.post(
        "http://localhost:8000/api/room_reservation/searchByDate",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      );
      if (Array.isArray(response.data.data)) {
        const data: UserReservationData[] = response.data.data.map(
          (item: any) => ({
            title: item.title,
            description: item.description,
            room_id: item.room_id,
            start_time: Number(item.start_time.split(":")[0]),
            end_time: Number(item.end_time.split(":")[0]),
            date: item.date,
            user_id: item.user_id,
            user: item.user,
          })
        );
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
      const response = await axios.get("http://localhost:8000/api/rooms", {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      });
      setRoomData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserReservationData = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios
          .get(
            `http://localhost:8000/api/room_reservation/searchByUserAndDate/${authUser.id}/${searchDate}`,
            {
              headers: {
                Authorization: `Bearer ${authRedux.token}`,
              },
            }
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    console.log(inputValues);
    sendDataToBackend({ inputValues });
    setOpen(false);
    setRefresh(true);
  };

  const sendDataToBackend = (data: { inputValues: ReservationData }) => {
    axios
      .patch(
        `http://127.0.0.1:8000/api/room_reservation/${inputValues.id}`,
        JSON.stringify(data.inputValues),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const columns: TableColumn<UserReservationData>[] = [
    {
      name: "Date",
      selector: (row: ReservationData) => row.date,
    },
    {
      name: "Team",
      selector: (row: UserReservationData) => row.user.team.name,
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
      name: "Room",
      selector: (row: UserReservationData) => row.room.name,
    },

    {
      name: "Start time",
      selector: (row: ReservationData) => TimeFormatConverter(row.start_time),
    },
    {
      name: "End time",
      selector: (row: ReservationData) => TimeFormatConverter(row.end_time),
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
              disabled={
                getTimeFormat(row.start_time.toString()) < currentTime &&
                new Date(row.date) < currentDate
              }
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
              disabled={
                getTimeFormat(row.start_time.toString()) < currentTime &&
                new Date(row.date) < currentDate
              }
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
  const onBackDropClick = () => {
    setOpen(false);
  };
  return (
    <div className="home">
      <div className="reservation-container">
        <h1 className="padding">Meeting Rooms Schedule</h1>

        <div className="date">
          <div className="date__reservationBtn">
            <Link
              to={`/${authRedux.role}-dashboard/room-reservation/reserve`}
              className="link-style"
            >
              Reserve Room
            </Link>
          </div>

          <div className="date__dateFilter">
            <label>Data Show By Date : &nbsp;</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>

        <div className="reservation-table">
          <ReservationsDataTable
            rooms={roomData}
            reservationData={SearchByDateData}
          />
        </div>
        <div className="userData">
          <h1>Your Reservation for "{searchDate}"</h1>
          <div className="userData__table">
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
                headRow: {
                  style: {
                    backgroundColor: "#e0e2e7", // Set your desired header color here
                    color: "#000", // Set the text color for the header
                  },
                },
              }}
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogContent>
                <div className="room-reservation form">
                  <form onSubmit={handleFormSubmit}>
                    <div>
                      <div className="elem-group">
                        <label htmlFor="room">
                          Room <span style={{ color: "red" }}>*</span>
                        </label>
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
                        <label htmlFor="title">
                          Title <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={inputValues.title}
                          onChange={handleInputChange}
                          placeholder="To meet with the client"
                        />
                      </div>

                      <div className="elem-group">
                        <label htmlFor="description">
                          Description <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="description"
                          value={inputValues.description}
                          onChange={handleInputChange}
                          placeholder="Agenda"
                          required
                        />
                      </div>
                      <div className="elem-group">
                        <label htmlFor="date">
                          Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={inputValues.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="elem-group inlined">
                        <label htmlFor="time">
                          Time <span style={{ color: "red" }}>*</span>
                        </label>
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

                      <div className="button-group">
                        <button type="submit">Update</button>
                        <button type="button" onClick={onBackDropClick}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;
