import "../../stylesheets/Cars.css"

import React, { useState } from "react";
import axios from "axios";

import Navbar from "../navigation/navbar";
import ViewSingleCar from "./viewSingleCar";

// component to update a car in the database
export default function UpdateCar() {

    // initialize state variables
    const [year, setYear] = useState('')
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [carid, setCarID] = useState('')

    // function to update a car using the provided data
    const submitHandler = (e) => {

        e.preventDefault()

        // set data to be an object with the year, make, and model
        const data = {
            "year": year,
            "make": make,
            "model": model
        }

        // update the owner using the provided data then clear the input fields in the form
        axios.patch(`/api/cars/${carid}`, data)
        .then(response => {
            console.log(data)
            console.log(response)
            setCarID('')
            setYear('')
            setMake('')
            setModel('')
        })
            .catch(error => {
                console.log(error)
        })
    }

    // return a form to be used to update a car in the database
    return (
      <div className="container">

        <Navbar />
        <ViewSingleCar />
        
        <div className="carsDisplay">

            <h2>Updated car information.</h2>
            <p>No fields can be left blank-you must fill in all fields. If you do not want to update one of the fileds, please enter the original data. </p>
            
            <form onSubmit={submitHandler}>

                {/* {get updated information from input fields} */}
                <input type="number" value={carid} onChange={e => setCarID(e.target.value)} placeholder="Car ID" className="carsInput"/>
                <input type="text" value={year} placeholder="Year" onChange={e => setYear(e.target.value)} className="carsInput"/>
                <input type="text" value={make} placeholder="Make" onChange={e => setMake(e.target.value)} className="carsInput"/>
                <input type="text" value={model} placeholder="Model" onChange={e => setModel(e.target.value)} className="carsInput"/>
                <button type="submit" className="carsButton">Update</button>
            </form>
        </div>

      </div>
    )
}
