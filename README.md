# Reservations_Frontend

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
