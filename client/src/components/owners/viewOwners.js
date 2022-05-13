import '../../stylesheets/Owners.css'

import React, { useEffect, useState } from "react";

import Navbar from "../navigation/navbar";

// export view owners page
function ViewOwners() {

    // initialize state variables to view data by class
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // initialize state variables to view all data
    const [backendData, setBackendData] = useState([{}])

    // function to get owners with name and or email specified by user in form
    const submitHandler = (e) => {

        e.preventDefault()

        fetch('/api/owners/').then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                console.log(backendData)
            }
        )
    }
    
    // get all the owners from the database, initially
    useEffect(() => {
        fetch('/api/owners/').then(
        response => response.json()
        ).then(
        data => {
            setBackendData(data)
        }
        )
    }, [])
    
    // return a table of all the owners or the owners specified by the name and/email address selected by the user
    return (
        <div className="container">
            {(typeof backendData.data === 'undefined') ? (
                <div>
                    <Navbar />

                    <p>Loading...</p>
                </div>
            ) : (
                <div>

                    <Navbar />

                    <div className="ownersDisplay">
                        <h2>All the owners in the database are listed below.</h2>
                        <p>Begin typing a name and/or email address to view owners that meet the desired criteria. </p>
                        <form onSubmit={submitHandler} className="ownersForm">
                            <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} className="ownersInput"/>
                            <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} className="ownersInput"/>
                            <button type="submit" className='ownersButton'>Search</button>
                        </form>

                        <table className="ownersTable">
                            <tbody>
                                <tr>
                                    <th className='ownersHeaderCell'>Car ID</th>
                                    <th className='ownersHeaderCell'>Name</th>
                                    <th className='ownersHeaderCell'>Email</th>
                                </tr>
                    
                                {
                                // allow user to specify a name and email address
                                (name !== '' && email !== ''
                                ) ? (
                                    backendData.data
                                    .filter(owner => owner.Name.toLowerCase().startsWith(name.toLowerCase()))
                                    .filter(owner => owner.Email.toLowerCase().startsWith(email.toLowerCase()))
                                    .map((owner, i) => (
                                        <tr key={i}>
                                            <td className='ownersCell'>{ owner.Car_ID }</td>
                                            <td className='ownersCell'>{ owner.Name }</td>
                                            <td className='ownersCell'>{ owner.Email }</td>
                                        </tr>
                                    ))
                                ) : (
                                    // allow user to specify only a name
                                    (name !== '') 
                                ) ? (
                                    backendData.data
                                    .filter(owner => owner.Name.toLowerCase().startsWith(name.toLowerCase()))
                                    .map((owner, i) => (
                                        <tr key={i}>
                                            <td className='ownersCell'>{ owner.Car_ID }</td>
                                            <td className='ownersCell'>{ owner.Name }</td>
                                            <td className='ownersCell'>{ owner.Email }</td>
                                        </tr> 
                                    ))
                                ) : (
                                    // allow user to specify only an email address
                                    (email !== '') 
                                ) ? (
                                    backendData.data
                                    .filter(owner => owner.Email.toLowerCase().startsWith(email.toLowerCase()))
                                    .map((owner, i) => (
                                        <tr key={i}>
                                            <td className='ownersCell'>{ owner.Car_ID }</td>
                                            <td className='ownersCell'>{ owner.Name }</td>
                                            <td className='ownersCell'>{ owner.Email }</td>
                                        </tr> 
                                    ))
                                ) : (
                                    // if user does not specify a name or email address, display all owners
                                    backendData.data.map((owner, i) => (
                                    <tr key={i}>
                                        <td className='ownersCell'>{ owner.Car_ID }</td>
                                        <td className='ownersCell'>{ owner.Name }</td>
                                        <td className='ownersCell'>{ owner.Email }</td>
                                    </tr>
                                )))

                            
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            )}
        </div>
    );
}

export default ViewOwners;

