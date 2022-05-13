import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';

// css style page for index.js
import './index.css';

import reportWebVitals from './reportWebVitals';


// view cars 
import ViewCarsRoute from './routes/cars/viewCarsRoute';
// view single car
import ViewSingleCarRoute from './routes/cars/viewSingleCarRoute';
// add a car
import AddCarRoute from './routes/cars/addCarRoute';
// update a car
import UpdateCarRoute from './routes/cars/updateCarRoute';


// view owners 
import ViewOwnersRoute from './routes/owners/viewOwnersRoute';
// view single owner
import ViewSingleOwnerRoute from './routes/owners/viewSingleOwnerRoute';
// add an owner
import AddOwnerRoute from './routes/owners/addOwnerRoute';
// update an owner
import UpdateOwnerRoute from './routes/owners/updateOwnerRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <Routes>
      <Route path="/" element={ <React.StrictMode> <App /> </React.StrictMode> } />
      
      <Route path="/cars" element={ <ViewCarsRoute />} />
      <Route path="/cars/:carid" element={ <ViewSingleCarRoute />} />
      <Route path="cars-single-add" element={ <AddCarRoute />} />
      <Route path="/cars/update" element={ <UpdateCarRoute /> }/>

      <Route path="/owners" element={ <ViewOwnersRoute />} />
      <Route path="/owners/:name" element={ <ViewSingleOwnerRoute />} />
      <Route path="owners-single-add" element={ <AddOwnerRoute />} />
      <Route path="/owners/update" element={ <UpdateOwnerRoute /> }/>
    </Routes>

  </BrowserRouter>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
