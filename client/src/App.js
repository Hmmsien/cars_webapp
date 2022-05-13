import "../src/App.css"

import Navbar from "./components/navigation/navbar";

// homepage
export default function App() {
  
  return (

    <div className="homePage">
      <Navbar />
          <h1 className="homeHeader">Cars Data</h1>
          <p className="homeP">Fullstack web application built with Node/Express, SQLite, and React. <br></br>
          <br></br>The navigation bar above allow to
          <br></br>view, add, and update the cars or owners information on the database.</p>
    </div>
  )
}
