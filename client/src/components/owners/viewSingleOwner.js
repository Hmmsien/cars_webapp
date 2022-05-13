import '../../stylesheets/Owners.css'

import React, { useState } from "react";

// component to view a single owner in the database
export default function ViewSingleOwner() {

    // initialize state variables
    const [backendData, setBackendData] = useState([{}])
    const [carid, setCarid] = useState('');

    // get data when the form is submitted
    const submitHandler = (e) => {

        e.preventDefault()

            fetch(`/api/owners/${carid}`).then(
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

    // return data on the requested owner
    return (
        <div className='container'>

            <div className="ownersDisplay">

                <h2>View a single owner infomation.</h2>
                <p>If input of the Car ID is not present in the database, no information will appear. <br></br>
                    You may add the owner to the database using the Add Owner link in the navigation bar above. </p>

                <form onSubmit={submitHandler}>

                    {/* {get owner's Car ID from input field} */}
                    <input type="text" value={carid} placeholder="Car id" onChange={e => setCarid(e.target.value)} className="ownersInput"/>
                    <button type="submit" className="ownersButton">Search</button>
                </form>

                <div>
                    {(typeof backendData.data === 'undefined') ? (
                        <p>{" "}</p>
                    ): (
                        // table with information on desired owner
                        <table className="ownersTable">
                            <tbody>
                                <tr>
                                    <th className='ownersHeaderCell'>Car ID</th>
                                    <th className='ownersHeaderCell'>Name</th>
                                    <th className='ownersHeaderCell'>Email</th>
                                </tr>
                                <tr>
                                    <td className="ownersCell"> {backendData.data.Car_ID}</td>
                                    <td className="ownersCell"> {backendData.data.Name}</td>
                                    <td className="ownersCell"> {backendData.data.Email}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

            </div>

        </div>
    )
}