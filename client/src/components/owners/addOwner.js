import '../../stylesheets/Owners.css'

import React, { Component } from "react";
import axios from "axios";

import Navbar from "../navigation/navbar";

// component to add an owner to the database
class AddOwner extends Component {

  // constructor
  constructor(props) {
    super(props)

    // initialize state
    this.state = {
      Car_ID: '',
      Name: '',
      Email: ''
    }
  }

  // function to handle input by setting state to the value that was input
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // add the provided data to the database when the form is submitted then clear the input fields in the form
  submitHandler = (e) => {
    e.preventDefault()

    console.log(this.state)

    axios.post('/api/owners/', this.state)
    .then(response => {
      console.log(response)
      this.setState({
        Car_ID: '',
        Name: '',
        Email: ''
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    
    // declare variables to be used in the return
    const { Car_ID, Name, Email } = this.state

    // return a form for the user to add an owner to the database
    return (
      <div className="container">

        <Navbar />

        <div className="ownersDisplay">

          <h2>Add new owner information</h2>
          <p>Do not leave any fields blank-You must fill in all fields.</p>

          <form onSubmit={this.submitHandler}>

            {/* {get car ID, name, and email address from input fields} */}
            <input type="number" name="Car_ID" placeholder="Car ID" value={Car_ID} onChange={this.changeHandler} className="ownersInput" />
            <input type="text" name="Name" placeholder="Name" value={Name} onChange={this.changeHandler} className="ownersInput"/>
            <input type="text" name="Email" placeholder="Email" value={Email} onChange={this.changeHandler} className="ownersInput"/>
            <button type="submit" className='ownersButton'>Add</button>
          </form>
        </div>

      </div>
    )
  }
}

export default AddOwner