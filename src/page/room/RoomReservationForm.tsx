import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Button } from "@mui/material";
import "./RoomReservationForm.css";
import { useAppSelector } from "../../redux/features/Hook";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface TeamData {
  id: number;
  name: string;
}

interface InputValue {
  team_id: number;
  start_time: string;
  end_time: string;
  room_id: number;
  title: string;
  description: string;
  date: string;
  user_id: number;
}
export interface RoomData {
  id: string;
  name: string;
}
const RoomReservationForm: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const authUser = authRedux.user.id;

  const initialInputValue: InputValue = {
    title: "",
    description: "",
    date: "",
    team_id: 1,
    start_time: "",
    end_time: "",
    room_id: 1,
    user_id: 1,
  };

  const [inputValue, setInputValue] = useState(initialInputValue);

  useEffect(() => {
    getRoomData().then((response: any) => {
      setRoomData(response.data);
    });
  }, []);

  const getRoomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/rooms")
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/teams")
      .then((response) => {
        setTeamData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //console.log(selectedValue);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    inputValue["user_id"] = authUser;
    sendDataToBackend({ inputValue });
    resetForm();
  };
  const resetForm = () => {
    setInputValue(initialInputValue);
  };
  const sendDataToBackend = (data: { inputValue: InputValue }) => {
    fetch("http://127.0.0.1:8000/api/room_reservation", {
      method: "POST",
      body: JSON.stringify(inputValue),
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

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1
          style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}
        >
          Room Reservation
        </h1>

        <div className="car_reserve_section">
          <form onSubmit={handleFormSubmit}>
            <div>
              <div className="elem-group">
                <label htmlFor="room">Room</label>
                <select
                  name="room_id"
                  value={inputValue.room_id}
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
                  value={inputValue.title}
                  onChange={handleInputChange}
                  placeholder="To meet with the client"
                />
              </div>

              <div className="elem-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={inputValue.description}
                  onChange={handleInputChange}
                  placeholder="Agenda"
                  required
                />
              </div>

              <div className="elem-group">
                <label htmlFor="teamname">Team Name</label>
                <select
                  name="team_id"
                  value={inputValue.team_id}
                  onChange={handleSelectChange}
                >
                  {teamData.map((teamdata) => (
                    <option key={teamdata.id} value={teamdata.id}>
                      {teamdata.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="elem-group inlined">
                <select
                  name="start_time"
                  value={inputValue.start_time}
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
                  value={inputValue.end_time}
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
                  value={inputValue.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Request Booking</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RoomReservationForm;
