# Reservations_Frontend

Hnin Pwint Aung
Hnin Pwint Aung#5354

Hnin Pwint Aung — 05/31/2023 3:47 PM
========================>
Component==>create==>CarDataTable.tsx
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  TableContainer,
Expand
message.txt
7 KB
Aye Thandar Aung — 05/31/2023 4:04 PM
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
Expand
message.txt
3 KB
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
Aye Thandar Aung — 05/31/2023 4:14 PM
import MailOutlineIcon from '@mui/icons-material/MailOutline';
Aung Aung — 05/31/2023 4:24 PM
import React, { useEffect, useState } from "react";
import CustomPhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
Expand
message.txt
8 KB
Route::post('teams', [TeamController::class, 'store']);
    Route::patch('teams/{id}', [TeamController::class, 'update']);
    Route::delete('teams/{id}', [TeamController::class, 'destroy']);
Hnin Pwint Aung — 05/31/2023 4:29 PM
Route::post('teams', [TeamController::class, 'store'])->middleware('auth:sanctum');
Route::get('teams', [TeamController::class, 'index']);
Route::patch('teams/{id}', [TeamController::class, 'update'])->middleware('auth:sanctum');
Route::delete('teams/{id}', [TeamController::class, 'destroy'])->middleware('auth:sanctum');
Hnin Pwint Aung — 05/31/2023 7:05 PM
@Aung Aung အစ်မကို User controller လေး ပ်ု့ပေးပါဦး
password ညီမညီ စစ်ထားတဲ့နေရာ
Aung Aung — 05/31/2023 7:09 PM
ဟုတ်အမ
<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
Expand
message.txt
15 KB
usercontroller pr ama
Hnin Pwint Aung — 05/31/2023 7:43 PM
ok
Aung Aung — Yesterday at 9:42 AM
.register{
  background: #e6dcdc;
  position: fixed;
  height: 100%;
  width: 100%;
  margin: 0px;
Expand
message.txt
5 KB
Aung Aung — Yesterday at 3:00 PM
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
Expand
message.txt
8 KB
Hnin Pwint Aung — Yesterday at 3:31 PM
// import React, { useEffect, useState } from "react";
// import CustomPhoneInput from "react-phone-input-2";

// import "react-phone-input-2/lib/style.css";
// import { Link } from "react-router-dom";
// import "react-phone-input-2/lib/style.css";
Expand
message.txt
21 KB
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/Hook";
import { setAuth } from "../../redux/features/auth/authSlice";
import { AuthRole } from "../../redux/features/type/authType";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
Expand
message.txt
6 KB
Hnin Pwint Aung — Yesterday at 3:55 PM
.dialog {
  text-align: center;
  &title {
    h1 {
      color: rgba(245, 99, 8, 0.933);
    }
  }
  &thanks-text {
    font-size: 15px;
  }

  &__button-group {
    margin-bottom: 30px;
    Button {
      background-color: orangered;
      color: whitesmoke;
      padding: 10px 25px;
    }
    Button:hover {
      background-color: rgb(118, 117, 116);
    }
  }
}
Hnin Pwint Aung — Yesterday at 4:05 PM
<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
Expand
message.txt
4 KB
.errorMessage {
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
}
Aung Aung — Yesterday at 8:08 PM
<?php

namespace App\Services\RoomReservation;

use App\Models\Room;
use App\Models\RoomReservation;
Expand
message.txt
9 KB
Aung Aung — Yesterday at 8:16 PM
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repository\RoomReservation\RoomReservationRepoInterface;
Expand
message.txt
6 KB
Hnin Pwint Aung — Yesterday at 10:17 PM
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomReservation;
Expand
message.txt
8 KB
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repository\CarReservation\CarReservationRepoInterface;
Expand
message.txt
7 KB
Aung Aung — Yesterday at 10:19 PM
https://github.com/aungaungytk/group2-reservation-system
GitHub
GitHub - aungaungytk/group2-reservation-system
Contribute to aungaungytk/group2-reservation-system development by creating an account on GitHub.
GitHub - aungaungytk/group2-reservation-system
Hnin Pwint Aung — Yesterday at 10:21 PM
<?php

namespace App\Services\CarReservation;

use App\Models\CarReservation;
use Carbon\Carbon;
Expand
message.txt
5 KB
<?php

namespace App\Services\RoomReservation;

use App\Models\Room;
use App\Models\RoomReservation;
Expand
message.txt
9 KB
import React, { useEffect, useState } from "react";
import ReservationsDataTable from "./ReservationsDataTable";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Link } from "react-router-dom";
Expand
message.txt
20 KB
import { useAppSelector } from "../../../redux/features/Hook";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSuccessMessage } from "../../SuccessMessageContext/SuccessMessageContext";

Expand
message.txt
10 KB
Hnin Pwint Aung — Yesterday at 10:32 PM
import { Link } from "react-router-dom";
import TableCar from "../../components/car/tableCar";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
Expand
message.txt
3 KB
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppSelector } from "../../redux/features/Hook";
Expand
message.txt
12 KB
<h2>Welcome to our Reservation System.</h2>
    <p>Hello, {{ $user->name }},</p>
    <p>Thank you for registering with us.</p>
    <p>Your account has been approved by the admin. You can now log in to the system using your
        credentials.</p>
    <br>
    <br>

    <p>Best Regards,</p>
    <p>Admin Team</p>
Hnin Pwint Aung — Yesterday at 10:40 PM
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
Expand
message.txt
4 KB
Hnin Pwint Aung — Yesterday at 10:55 PM
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomReservation;
Expand
message.txt
8 KB
<?php

namespace App\Services\RoomReservation;

use App\Models\Room;
use App\Models\RoomReservation;
Expand
message.txt
9 KB
Hnin Pwint Aung — Yesterday at 11:03 PM
import { useAppSelector } from "../../../redux/features/Hook";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSuccessMessage } from "../../SuccessMessageContext/SuccessMessageContext";

Expand
message.txt
10 KB
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\AuthController;
Expand
message.txt
5 KB
Hnin Pwint Aung — Yesterday at 11:11 PM
<?php

namespace App\Repository\RoomReservation;

use App\Models\Team;
use App\Models\User;
use App\Models\Reservation;
use App\Models\RoomReservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class RoomReservationRepository implements RoomReservationRepoInterface
{
    public function get()
    {
        return RoomReservation::with(['user', 'room'])->get();
    }
    public function show($id)
    {
        return RoomReservation::where('id', $id)->first();
    }
    public function searchByDate($date)
    {
        return  RoomReservation::with(['room', 'user'])->where('date', $date)->get();
    }

    public function searchByUserAndDate($user_id, $date)
    {
        return RoomReservation::with(['room', 'user'])->where('user_id', $user_id)->where('date', $date)->get();
    }

    public function getRoomReserveCount()
    {
        return RoomReservation::count();
    }

    public function getRoomReserveCountByTeam()
    {
        $teamRoomReservations = Team::select('teams.id', 'teams.name', DB::raw('COUNT(room_reservations.id) as reservation_count'))
            ->leftJoin('users', 'users.team_id', '=', 'teams.id')
            ->leftJoin('room_reservations', 'room_reservations.user_id', '=', 'users.id')
            ->groupBy('teams.id', 'teams.name')
            ->get();

        return $teamRoomReservations;
    }

    public function getRoomReserveCountById($id)
    {
        $data = count(RoomReservation::where('user_id', $id)->get());
        return $data;
    }
    public function getRoomReservationCountByMonth()
    {
        $currentYear = date('Y');
        $results = DB::table('room_reservations')
            ->select(DB::raw('DATE_FORMAT(date, "%m") as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('date', $currentYear)
            ->groupBy('month')
            ->get();
        return $results;
    }
}
Hnin Pwint Aung — Yesterday at 11:20 PM
$superAdmin = User::create(
            [
                'name' => 'superadmin',
                'email' => 'superadmin@gmail.com',
                'employee_id' => 'ACE-001',
                'password' => Hash::make('superadmin12345'),
Expand
message.txt
3 KB
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
Expand
message.txt
4 KB
<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarReservation;
Expand
message.txt
5 KB
Aye Thandar Aung — Yesterday at 11:44 PM
String(item.no_of_traveller).includes(searchText)
Hnin Pwint Aung — Today at 1:30 AM
.dialog {
  text-align: center;
  &title {
    h1 {
      color: rgba(245, 99, 8, 0.933);
    }
  }
  &thanks-text {
    font-size: 15px;
  }

  &__button-group {
    margin-bottom: 30px;
    Button {
      background-color: orangered;
      color: whitesmoke;
      padding: 10px 25px;
    }
    Button:hover {
      background-color: rgb(118, 117, 116);
    }
  }
}
Hnin Pwint Aung — Today at 9:30 AM
import React, { useEffect, useState } from "react";
import ReservationsDataTable from "./ReservationsDataTable";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Link } from "react-router-dom";
Expand
message.txt
20 KB
Hnin Pwint Aung — Today at 10:26 AM
public function store($data)
    {
        $currentDateTime = Carbon::now();
        $inputDate = Carbon::parse($data['date']);
        $inputTime = Carbon::parse($data['start_time']);
        $currentTime = Carbon::now();
        $currentTime->setTimezone('Asia/Yangon');
        $formattedTime = $currentTime->format('H:i:s');
        $formattedInput = $inputTime->format('H:i:s');

        $car = CarReservation::with('car')->where('car_id', $data['car_id'])->get();

        if ($inputDate > $currentDateTime || $formattedInput >= $formattedTime) {
            if ($data['start_time'] < $data['end_time']) {
                if ($data['car_id'] != null && isset($data['car_id'])) {
                    if ($data['no_of_traveller'] <= $car[0]->car->capacity) {
                        $inputCar = $data['car_id'];

                        $existingReservation = CarReservation::all();
                        $inputStartTime = $data['start_time'];
                        $inputEndTime = $data['end_time'];
                        foreach ($existingReservation as $reservation) {
                            $overlap = $this->checkCarReservationOverlap($inputStartTime, $inputEndTime, $inputDate, $inputCar);
                            if ($overlap) {
                                return "overlap";
                            }
                        }
                        return CarReservation::create($data);
                    } else {
                        return "capacityError";
                    }
                }
            } else {
                return "endTimeError";
            }
        } else {
            return "errorDate";
        }
    }
if ($reservation == "capacityError") {
                return $this->sendError(['capacityError' => 'Your passenger count is greater than the car capacity!'], "Validation Error", 405);
            }
if (error.response.data.message.capacityError) {
          setMessage(error.response.data.message.capacityError);
        }
Hnin Pwint Aung — Today at 10:36 AM
Image
Aye Thandar Aung — Today at 11:05 AM
<p style={{ textAlign: "center", marginTop: "10px", fontWeight:"bold"}}>Car Reservatin Pie Chart</p>
Aung Aung — Today at 11:05 AM
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dialog,
    DialogContent,
Expand
message.txt
7 KB
Aye Thandar Aung — Today at 11:51 AM
const config: ChartOptions<'pie'> = {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Car Reservation Pie Chart',
          position: 'bottom',
          font: {weight: 'bold', size: 18},
          align: 'center',
        }
      }
    },
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Pie data={chartData} options={config.options}/>
    </div>
  );
options: {
            plugins: {
              title: {
                  display: true,
                  text: 'Room Reservation Bar Chart',
                  position: 'bottom',
                  font: {weight: 'bold', size: 18},
                  align: 'center',
                  padding: 5,
              }
          },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  // callback: (value) => ${value} units, // Custom label format
                  stepSize: 3,
                },
              },
            },
          },
Hnin Pwint Aung — Today at 12:08 PM
<Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e: any) => {
                e.preventDefault();
                handleEdit(row);
              }}
              disabled={
                getTimeFormat(row.start_time.toString()) > currentTime &&
                new Date(row.date) < new Date(currentDate)
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
                getTimeFormat(row.start_time.toString()) > currentTime &&
                new Date(row.date) < new Date(currentDate)
              }
            >
              Delete
            </Button>
const getTimeFormat = (date: string) => {
    const [hours, minutes, seconds] = date.split(":");
    const time = new Date();
    time.setHours(Number(hours));
    time.setMinutes(Number(minutes));
    time.setSeconds(Number(seconds));
    return time;
  };
Aye Thandar Aung — Today at 12:23 PM
# Group-2 => Meeting Room and Car Reservation System
A meeting room and car reservation system built with Laravel,MySQL,SCSS and ReactTS.

### Solution
A web-based application that allows the client (including its administrative staff, management staff and stakeholders) to login from anywhere easily, accurately and quickly make room and car reservation.
Expand
readme.txt
3 KB
Hnin Pwint Aung — Today at 12:29 PM
import React, { useEffect, useState } from "react";
import ReservationsDataTable from "./ReservationsDataTable";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Link } from "react-router-dom";
Expand
message.txt
20 KB
<?php

namespace App\Services\RoomReservation;

use App\Models\Room;
use App\Models\RoomReservation;
Expand
message.txt
9 KB
Hnin Pwint Aung — Today at 12:42 PM
https://github.com/hninpwintaung-hpa/Reservations_Backend.git
GitHub
GitHub - hninpwintaung-hpa/Reservations_Backend
Contribute to hninpwintaung-hpa/Reservations_Backend development by creating an account on GitHub.
GitHub - hninpwintaung-hpa/Reservations_Backend
﻿
# Group-2 => Meeting Room and Car Reservation System
A meeting room and car reservation system built with Laravel,MySQL,SCSS and ReactTS.

### Solution
A web-based application that allows the client (including its administrative staff, management staff and stakeholders) to login from anywhere easily, accurately and quickly make room and car reservation.

<!-- This will help to ensure that room and car resources are used as fully-utilised as possible, whilst avoiding overlap booking and other common user frustrations. It will also make room and car reservation statistics available to the client's staff and management to assist their planning and decision-making. -->

## Features

-   Simple Interactive UI
-   ## Admin
-   can create, edit and delete new room, car and team
-   see the records of rooms and car reservation, and reports as well
-   can approve new register user
-   manage meeting room and car reservation data
-   manage testimonials(active and inactive)
-   able to add and/or approve admin user accounts
-   can change role of user
-   Basic CRUD of Laravel API & React Frontend

-   ## User
-   only approved user can login
-   can create room and car reservation
-   can edit and cancel room reservation before the date and time expired
-   can see meeting reservation schedule 

### Demo Credentials
SuperAdmin: superadmin@gmail.com
Password: superadmin12345

Admin: admin@gmail.com
Password: admin12345

Staff: staff@gmail.com
Password: user312345

### Installation
Clone the repo
```
git clone https://github.com/aungaungytk/group2-reservation-system
```

Change to the `backend` folder and install development and production dependencies.

```
cd backend
yarn install or npm install
composer update
```

If you will need to `.env file`

```
cp .env.example .env
php artisan key:generate
```

Change to the `frontend` folder and install development and producation dependencies.
```
cd frontend
yarn install or npm install
```

You will need to set up MySQL.

create database 'reservation'
```
composer install or update
php artisan migrate:refresh --seed
```

Go to the `backend` folder and start the server.
```
cd backend
php artisan serve
npm run dev
```

Go to the `frontend` folder and run the script start script.
```
cd frontend
npm run dev
```

Open in your browser and navigate to [http://127.0.0.1:5173]. You access the back-end on [http://127.0.0.1:8000].

## `Stay safe 😷`
readme.txt
3 KB
