import React, { useState } from "react";
import "./SearchByDate.css";
import axios from "axios";

const SearchByDate = () => {
  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleSearchByDate = () => {};
  // const getRoomData = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/api/rooms");
  //     setRoomData(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //};
  return (
    <div className="dateFilter">
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
      <button onClick={handleSearchByDate}>Search</button>
    </div>
  );
};

export default SearchByDate;
