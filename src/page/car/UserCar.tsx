import { Link } from "react-router-dom";
import TableCar from "../../components/car/tableCar";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

export const Car = () => {
  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get("success");
  const [alert, setAlert] = useState(true);
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div>
          <h1 className={darkMode ? "dark_title" : "page_title"}>
            Car Reservations Schedules
          </h1>
          <div style={{ textAlign: "center", color: "green" }}></div>
          <div className="date">
            <Link
              to="/staff-dashboard/car-reservation/car-booking"
              style={{
                textDecoration: "none",
                display: "block",
                textAlign: "left",
                padding: "10px 0px",
                cursor: "default",
              }}
            >
              <Button
                size="medium"
                variant="contained"
                disableRipple
                className={darkMode ? "dark_btn" : ""}
              >
                Book Car
              </Button>
            </Link>
            {successMessage && (
              <Collapse in={alert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {successMessage}
                </Alert>
              </Collapse>
            )}
            <div className="date__dateFilter">
              <label> Search by Date : &nbsp;</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <TableCar date={searchDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
