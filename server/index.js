//create express app
const express = require('express');
const app = express();

// initialize server port 
const PORT = process.env.PORT || 4000;

// connect to the database
const db = require("./database.js")

// parse through incoming data through HTTP requests
app.use(express.json());

// start server
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

// root endpoint
app.get("/", (req, res, next) => {
    res.json({message: "You have reached the root of the Car Data API for CISC 3140 Lab 4."})
});

// GET REST API Request, HTTP Method Type: GET

// Showing results of all cars present in the CSV file
// http://localhost:4000/api/cars
app.get("/api/cars/", (req, res, next) => {
    var sql = 'SELECT * FROM cars_data'
    var reqBody = req.body
    var params = [reqBody.Car_ID, reqBody.Year, reqBody.Make, reqBody.Model, reqBody.Racer_Turbo, reqBody.Racer_Supercharged, reqBody.Racer_Performance, reqBody.Racer_Horsepower, reqBody.Car_Overall, reqBody.Engine_Modifications, reqBody.Engine_Performance, reqBody.Engine_Chrome, reqBody.Engine_Detailing, reqBody.Engine_Cleanliness, reqBody.Body_Frame_Undercarriage, reqBody.Body_Frame_Suspension, reqBody.Body_Frame_Chrome, reqBody.Body_Frame_Detailing, reqBody.Body_Frame_Cleanliness, reqBody.Mods_Paint, reqBody.Mods_Body, reqBody.Mods_Wrap, reqBody.Mods_Rims, reqBody.Mods_Interior, reqBody.Mods_Other, reqBody.Mods_ICE, reqBody.Mods_Aftermarket, reqBody.Mods_WIP, reqBody.Mods_Overall]
    
    db.all( sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ 
            "message": "success",
            "data": rows
         });
    });
});

// Display single car information record result of selected Car_ID from Car table
// http://localhost:4000/api/cars/48
app.get("/api/cars/:carid", (req, res, next) => {

    var sql = "SELECT * FROM cars_data where Car_ID = ?"
    var params = [req.params.carid]

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message":"success",
            "data":row
        })
    });
});

// Create REST API Request, HTTP Method Type: POST
// Inserting new data record(s) into cars_data table
app.post("/api/cars/", (req, res, next) => {
    var sql = "INSERT INTO cars_data (Car_ID, Year, Make, Model, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower, Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness, Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness, Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    var reqBody = req.body
    var params = [reqBody.Car_ID, reqBody.Year, reqBody.Make, reqBody.Model, reqBody.Racer_Turbo, reqBody.Racer_Supercharged, reqBody.Racer_Performance, reqBody.Racer_Horsepower, reqBody.Car_Overall, reqBody.Engine_Modifications, reqBody.Engine_Performance, reqBody.Engine_Chrome, reqBody.Engine_Detailing, reqBody.Engine_Cleanliness, reqBody.Body_Frame_Undercarriage, reqBody.Body_Frame_Suspension, reqBody.Body_Frame_Chrome, reqBody.Body_Frame_Detailing, reqBody.Body_Frame_Cleanliness, reqBody.Mods_Paint, reqBody.Mods_Body, reqBody.Mods_Wrap, reqBody.Mods_Rims, reqBody.Mods_Interior, reqBody.Mods_Other, reqBody.Mods_ICE, reqBody.Mods_Aftermarket, reqBody.Mods_WIP, reqBody.Mods_Overall]
    let numObjsToInsert = 0;
    

    // loop through the request body that was passed in
    for(var obj in reqBody.bulk) {

        // increment the counter of the number of objects to insert
        numObjsToInsert++;

        // push each object that was passed in to the params array
        params.push(reqBody.bulk[obj].Car_ID, reqBody.bulk[obj].Year, reqBody.bulk[obj].Make, reqBody.bulk[obj].Model, 
            reqBody.bulk[obj].Racer_Turbo, reqBody.bulk[obj].Racer_Supercharged, reqBody.bulk[obj].Racer_Performance, reqBody.bulk[obj].Racer_Horsepower, 
            reqBody.bulk[obj].Car_Overall, reqBody.bulk[obj].Engine_Modifications, reqBody.bulk[obj].Engine_Performance, reqBody.bulk[obj].Engine_Chrome, reqBody.bulk[obj].Engine_Detailing, reqBody.bulk[obj].Engine_Cleanliness, 
            reqBody.bulk[obj].Body_Frame_Undercarriage, reqBody.bulk[obj].Body_Frame_Suspension, reqBody.bulk[obj].Body_Frame_Chrome, reqBody.bulk[obj].Body_Frame_Detailing, reqBody.bulk[obj].Body_Frame_Cleanliness, 
            reqBody.bulk[obj].Mods_Paint, reqBody.bulk[obj].Mods_Body, reqBody.bulk[obj].Mods_Wrap, reqBody.bulk[obj].Mods_Rims, reqBody.bulk[obj].Mods_Interior, reqBody.bulk[obj].Mods_Other, reqBody.bulk[obj].Mods_ICE, reqBody.bulk[obj].Mods_Aftermarket, reqBody.bulk[obj].Mods_WIP, reqBody.bulk[obj].Mods_Overall)

    }

    // modify the sql command to allow for the number of objects that were passed in
    for(var i=0; i<numObjsToInsert-1; i++) {
        sql += ", (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    }  

    db.run( sql , params,
        function (err, row) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "message": "success",
                "data": params,
                "id": this.lastID
            })
        });
});

// endpoint to update an owner using the car id as a parameter
app.patch("/api/cars/:carid", (req, res, next) => {

    // create data object
    var data = {
        Year: req.body.Year,
        Make: req.body.Make, 
        Model: req.body.Model,
        Racer_Turbo: req.body.Racer_Turbo,
        Racer_Supercharged: req.body.Racer_Supercharged,
        Racer_Performance: req.body.Racer_Performance,
        Racer_Horsepower: req.body.Racer_Horsepower,
        Car_Overall: req.body.Car_Overall,
        caroverall: req.body.caroverall,
        Engine_Modifications: req.body.Engine_Modifications,
        Engine_Performance: req.body.Engine_Performance,
        Engine_Chrome: req.body.Engine_Chrome,
        Engine_Detailing: req.body.Engine_Detailing,
        Engine_Cleanliness: req.body.Engine_Cleanliness,
        Body_Frame_Undercarriage: req.body.Body_Frame_Undercarriage,
        Body_Frame_Suspension: req.body.Body_Frame_Suspension,
        Body_Frame_Chrome: req.body.Body_Frame_Chrome,
        Body_Frame_Detailing: req.body.Body_Frame_Detailing,
        Body_Frame_Cleanliness: req.body.Body_Frame_Cleanliness,
        Mods_Paint: req.body.Mods_Paint,
        Mods_Body: req.body.Mods_Body,
        Mods_Wrap: req.body.Mods_Wrap,
        Mods_Rims: req.body.Mods_Rims,
        Mods_Interior: req.body.Mods_Interior,
        Mods_Other: req.body.Mods_Other,
        Mods_ICE: req.body.Mods_ICE,
        Mods_Aftermarket: req.body.Mods_Aftermarket,
        Mods_WIP: req.body.Mods_WIP,
        Mods_Overall: req.body.Mods_Overall,
        Car_ID: req.params.Car_ID
    }

    let sql = "UPDATE cars_data set WHERE Car_ID = ?, Year = ?, Make = ?, Model = ?, Racer_Turbo = ?, Racer_Supercharged = ?, Racer_Performance = ?, Racer_Horsepower = ?, Car_Overall = ?, Engine_Modifications = ?, Engine_Performance = ?, Engine_Chrome = ?, Engine_Detailing = ?, Engine_Cleanliness = ?, Body_Frame_Undercarriage = ?, Body_Frame_Suspension = ?, Body_Frame_Chrome = ?, Body_Frame_Detailing = ?, Body_Frame_Cleanliness = ?, Mods_Paint = ?, Mods_Body = ?, Mods_Wrap = ?, Mods_Rims = ?, Mods_Interior = ?, Mods_Other = ?, Mods_ICE = ?, Mods_Aftermarket = ?, Mods_WIP = ?, Mods_Overall = ?) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    let params = [data.Car_ID, data.Year, data.Make, data.Model, 
        data.Racer_Turbo, data.Racer_Supercharged, data.Racer_Performance, data.Racer_Horsepower, data.Car_Overall, 
        data.Engine_Modifications, data.Engine_Performance, data.Engine_Chrome, data.Engine_Detailing, data.Engine_Cleanliness, 
        data.Body_Frame_Undercarriage, data.Body_Frame_Suspension, data.Body_Frame_Chrome, data.Body_Frame_Detailing, data.Body_Frame_Cleanliness, 
        data.Mods_Paint, data.Mods_Body, data.Mods_Wrap, data.Mods_Rims, data.Mods_Interior, data.Mods_Other, data.Mods_ICE, data.Mods_Aftermarket, data.Mods_WIP, data.Mods_Overall]
 
    db.run(sql, params,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
        });
        res.status(200).json({
                message: "success",
                data: data,
                changes: this.changes
            })
});

// Showing results of all the car owners contact information
// http://localhost:4000/api/owners
app.get("/api/owners/", (req, res, next) => {
    var sql = "SELECT * FROM owner WHERE Car_ID = COALESCE(?, Car_ID) AND Name = COALESCE(?, Name) AND Email = COALESCE(?, Email)"
    var params = [req.query.carid, req.query.name, req.query.email]

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ 
            "message": "success",
            "data": rows
         });
    });
});

// Showing results of owner by car ID
// http://localhost:4000/api/owners/:carid
app.get("/api/owners/:carid", (req, res, next) => {
    var params = [req.params.carid]
    db.get("SELECT * FROM owner where Car_ID = ?", params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({
            "message":"success",
            "data":row
        })
    });
});

// Inserting new data record(s) to owner table
app.post("/api/owners/", (req, res, next) => {

    let reqBody = req.body
    let sql = 'INSERT INTO owner (Car_ID, Name, Email) VALUES (?, ?, ?)'
    let params = []
    let numObjsToInsert = 0;
    
    // loop through the request body that was passed in
    for(var obj in reqBody.bulk) {

        // increment the counter of the number of objects to insert
        numObjsToInsert++;

        // push each object that was passed in to the params array
        params.push(reqBody.bulk[obj].Car_ID, reqBody.bulk[obj].Name, reqBody.bulk[obj].Email)
    }

    // modify the sql command to allow for the number of objects that were passed in
    for(var i=0; i<numObjsToInsert-1; i++) {
        sql += ", (?, ?, ?)"
    }  

    db.run( sql , params,
        function (err, row) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "message": "success",
                "data": params,
                "id": this.lastID
            })
        });
});

// endpoint to update an owner using the car id as a parameter
app.patch("/api/owners/:carid", (req, res, next) => {

    // create data object
    var data = {
        name: req.body.Name,
        email: req.body.Email,
        carid: req.params.carid
    }

    let sql = 'UPDATE owner set Name = COALESCE(?, Name), Email = COALESCE(?, Email), WHERE Car_ID = ?'
    let params = [data.name, data.email, data.carid]
    
        db.run(sql, params ,
        function (err) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            } 
        });
        res.status(200).json({
                message: "success",
                data: data,
                changes: this.changes
            })
});


