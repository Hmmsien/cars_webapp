# Cars Data
 Lab 5 is a fullstack web application built with Node/Express, SQLite, and React that allows users to view and update data about cars.

## Dependencies
* SQLite3
* NodeJS
* Express  
* react
* react-dom
* react-router-dom
* http-proxy-middleware

## Getting Started

Copy repo to local machine. The repo contains a csv file named `data.csv`
```sh
$ https://github.com/Hmmsien/cars_webapp.git
```

After cloning the project repository, you must connect to both the backend server and the frontend application. 

To connect to the backend server, cd into the [server folder](./server/) and run the following lines of code to install the project dependencies and start the application.

```
$ git submodule init
$ git submodule update
npm install
cat server/create_table.sql | sqlite3 server/cars.db
npm start
```

To connect to the frontend application, cd into the [client folder](./client/) and run the following lines of code to install the project dependencies and start the application.

```
npm install
npm start
```
