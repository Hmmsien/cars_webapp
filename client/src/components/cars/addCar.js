import '../../stylesheets/Cars.css'

import React, { Component } from "react";
import axios from "axios";

import Navbar from "../navigation/navbar";

// component to add a car to the database
class AddCar extends Component {

  // constructor
  constructor(props) {
    super(props)

    // initialize state
    this.state = {
      carid: '',
      year: '',
      make: '',
      model: '',
      racerturbo: '',
      racersupercharged: '',
      racerperformance: '',
      racerhorsepower: '',
      caroverall: '',
      enginemodifications: '',
      engineperformance: '',
      enginechrome: '',
      enginedetailing: '',
      enginecleanliness: '',
      bfundercarriage: '',
      bfsuspension: '',
      bfchrome: '',
      bfdetailing: '',
      bfcleanliness: '',
      modspaing: '',
      modsbody: '',
      modswrap: '',
      modsrims: '',
      modsinterior: '',
      modsother: '',
      modsice: '',
      modsaftermarket: '',
      modswip: '',
      modsoverall: ''
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

    axios.post('/api/cars-single-add', this.state)
    .then(response => {
      console.log(response)
      this.setState({
        carid: '',
      year: '',
      make: '',
      model: '',
      racerturbo: '',
      racersupercharged: '',
      racerperformance: '',
      racerhorsepower: '',
      caroverall: '',
      enginemodifications: '',
      engineperformance: '',
      enginechrome: '',
      enginedetailing: '',
      enginecleanliness: '',
      bfundercarriage: '',
      bfsuspension: '',
      bfchrome: '',
      bfdetailing: '',
      bfcleanliness: '',
      modspaing: '',
      modsbody: '',
      modswrap: '',
      modsrims: '',
      modsinterior: '',
      modsother: '',
      modsice: '',
      modsaftermarket: '',
      modswip: '',
      modsoverall: ''
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    
    // declare variables to be used in the return
    const { carid, year, make, model, racerturbo, racersupercharged, racerperformance, racerhorsepower, caroverall, enginemodifications, engineperformance, enginechrome, enginedetailing, enginecleanliness, bfundercarriage, bfsuspension, bfchrome, bfdetailing, bfcleanliness, modspaint, modsbody, modswrap, modsrims, modsinterior, modsother, modsice, modsaftermarket, modswip, modsoverall } = this.state

    // return a form for the user to add a car to the database
    return (
      <div className="container">

        <Navbar />

        <div className="carsDisplay">

          <h2>Add new car information.</h2>
          <p>Do not leave any fields blank-You must fill in all fields.</p>
          
          <form onSubmit={this.submitHandler}>

            {/* get details about car from input fields */}
            <input type="number" name="carid" placeholder="Car ID" value={carid} onChange={this.changeHandler} className="carsInput" />
            <input type="text" name="year" placeholder="Year" value={year} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="make" placeholder="Make" value={make} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="model" placeholder="Model" value={model} onChange={this.changeHandler} className="carsInput"/>
            <br></br>
            <input type="text" name="racerturbo" placeholder="Racer Turbo Score" value={racerturbo} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="racersupercharged" placeholder="Racer Supercharged Score" value={racersupercharged} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="racerperformance" placeholder="Racer Performance Score" value={racerperformance} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="racerhorsepower" placeholder="Racer Horsepower Score" value={racerhorsepower} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="caroverall" placeholder="Car Overall Score" value={caroverall} onChange={this.changeHandler} className="carsInput"/>
            <br></br>
            <input type="text" name="enginemodifications" placeholder="Engine Modifications Score" value={enginemodifications} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="engineperformance" placeholder="Engine Performance Score" value={engineperformance} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="enginechrome" placeholder="Engine Chrome Score" value={enginechrome} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="enginedetailing" placeholder="Engine Detailing Score" value={enginedetailing} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="enginecleanliness" placeholder="EngineCleanlinessScore" value={enginecleanliness} onChange={this.changeHandler} className="carsInput"/>
            <br></br>
            <input type="text" name="bfundercarriage" placeholder="Body Frame Undercarriage Score" value={bfundercarriage} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="bfsuspension" placeholder="Body Frame Suspension Score" value={bfsuspension} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="bfchrome" placeholder="Body Frame Chrome Score" value={bfchrome} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="bfdetailing" placeholder="Body Frame Detailing Score" value={bfdetailing} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="bfcleanliness" placeholder="Body Frame Cleanliness Score" value={bfcleanliness} onChange={this.changeHandler} className="carsInput"/>
            <br></br>
            <input type="text" name="modspaint" placeholder="Paint Mods Score" value={modspaint} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsbody" placeholder="Body Mods Score" value={modsbody} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modswrap" placeholder="Wrap Mods Score" value={modswrap} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsrims" placeholder="Rims Mods Score" value={modsrims} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsinterior" placeholder="Interior Mods Score" value={modsinterior} onChange={this.changeHandler} className="carsInput"/>
            <br></br>
            <input type="text" name="modsinterior" placeholder="Interior Mods Score" value={modsinterior} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsother" placeholder="Other Mods Score" value={modsother} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsice" placeholder="ICE Mods Score" value={modsice} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsaftermarket" placeholder="Aftermarket Mods Score" value={modsaftermarket} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modswip" placeholder="WIP Mods Score" value={modswip} onChange={this.changeHandler} className="carsInput"/>
            <input type="text" name="modsoverall" placeholder="Overall Mods Score" value={modsoverall} onChange={this.changeHandler} className="carsInput"/>
            <br></br>
            <button type="submit" className='carsButton'>Add</button>
          </form>
        </div>

      </div>
    )
  }
}

export default AddCar