import '../../stylesheets/navbar.css'

import React from "react";

export default function Navbar() {
    
    // return a navigation bar with links to the home page, the cars homepage, and the owners homepage
    return (
        <div class="navbar">
            <a href='/'>Home</a>
            <div class="subnav">
                <button class="subnavbtn">Cars <i class="fa fa-caret-down"></i></button>
                <div class="subnav-content">
                    <a href='/cars'>View cars</a>
                    <a href='/cars-single-add'>Add Car</a>
                    <a href='/cars/update'>Update Car info</a>
                </div>
            </div> 
            <div class="subnav">
                <button class="subnavbtn">Owners <i class="fa fa-caret-down"></i></button>
                <div class="subnav-content">
                    <a href='/owners'>View Owners</a>
                    <a href='/owners-single-add'>Add Owner</a>
                    <a href='/owners/update'>Update Owner</a>
                </div>
            </div> 
        </div>
    )
}