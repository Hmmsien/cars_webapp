import "../src/App.css"

import Navbar from "./components/navigation/navbar";

// homepage
export default function App() {
  
  return (

    <div className="homePage">
      <Navbar />
          <h1 className="homeHeader">Cars Data</h1>
          <p className="homeP">Fullstack web application built with Node/Express, SQLite, and React. <br></br>
          <br></br>Please use the links in the navigation bar above 
          <br></br>To view, add to, and update the cars data and owners data in the database.</p>
    </div>
  )
}
