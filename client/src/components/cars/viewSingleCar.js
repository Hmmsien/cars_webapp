import '../../stylesheets/Cars.css'

import React, { useState } from "react";

// component to display a single car in the database
export default function ViewSingleCar(props) {

    // initialize state variables
    const [backendData, setBackendData] = useState([{}])
    const [carid, setCarid] = useState('');

    // get data when the form is submitted
    const submitHandler = (e) => {

        e.preventDefault()

            fetch(`/api/cars/${carid}`).then(
                response => response.json()
            ).then(
                data => {
                    setBackendData(data)
                }
            ).then(
                setCarid('')
            )

            console.log(backendData)
    }

    // return data on the requested car
    return (
        <div className='container'>

            <div className="carsDisplay">

                <h2>View a single car infomation.</h2>
                <p>If the enter the Car ID of a car that is not present in the database, no information will appear. <br></br>
                    You may add the car to the database using the Add Car link in the navigation bar above. </p>

                <form onSubmit={submitHandler}>

                    {/* {get Car ID of desired car from input field} */}
                    <input type="text" value={carid} placeholder="Car ID" onChange={e => setCarid(e.target.value)} className="carsInput"/>
                    <button type="submit" className="carsButton">Search</button>
                </form>

                <div>
                    {(typeof backendData.data === 'undefined') ? (
                        <p>{" "}</p>
                    ): (
                        // display information on desired car
                        <table className="carsTable">
                            <tbody>
                                <tr>
                                    <th className='carsHeaderCell'>Car ID</th>
                                    <th className='carsHeaderCell'>Year</th>
                                    <th className='carsHeaderCell'>Make</th>
                                    <th className='carsHeaderCell'>Model</th>
                                    <th className='carsHeaderCell'>Car Overall Score</th>
                                </tr>
                                <tr>
                                    <td className='carsCell'>{ backendData.data.Car_ID }</td>
                                    <td className='carsCell'>{ backendData.data.Year }</td>
                                    <td className='carsCell'>{ backendData.data.Make }</td>
                                    <td className='carsCell'>{ backendData.data.Model }</td>
                                    <td className='carsCell'>{ backendData.data.Car_Overall }</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

            </div>

        </div>
    )
}