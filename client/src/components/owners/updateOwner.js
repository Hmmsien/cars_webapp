import "../../stylesheets/Owners.css"

import React, { useState } from "react";
import axios from "axios";
import ViewSingleOwner from "./viewSingleOwner";
import Navbar from "../navigation/navbar";

// component to update an owner in the database
export default function UpdateOwner() {

    // initialize state variables
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [carid, setCarID] = useState('');

    // function to update an owner using the provided data
    const submitHandler = (e) => {

        e.preventDefault()

        // set data to be an object with the name and email of an owner
        const data = {
            "name": name,
            "email": email
        }

        // update the owner using the provided data then clear the input fields in the form
        axios.patch(`/api/owners/${carid}`, data)
        .then(response => {
            console.log(data)
            console.log(response)
            setCarID('')
            setName('')
            setEmail('')
        })
            .catch(error => {
                console.log(error)
        })
    }

    // return a form to be used to update an owner in the database
    return (
      <div className="container">

        <Navbar />
        <ViewSingleOwner />
        
        <div className="ownersDisplay">

            <h2>Update owener infomation.</h2>
            <p>No fields can be left blank-you must fill in all fields. If you do not want to update one of the fileds, please enter the original data. </p>

            <form onSubmit={submitHandler}>

                {/* {get car ID, name, and email address from input fields} */}
                <input type="number" value={carid} onChange={e => setCarID(e.target.value)} placeholder="Car ID" className="ownersInput"/>
                <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} className="ownersInput"/>
                <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} className="ownersInput"/>
                <button type="submit" className="ownersButton">Update</button>
            </form>
        </div>


      </div>
    )
}