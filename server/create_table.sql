DROP TABLE IF EXISTS data;
DROP TABLE IF EXISTS cars_data;
DROP TABLE IF EXISTS owner;

-- create a table that have all information in the provid data.csv
.mode csv
.import \./data/data.csv data

CREATE TABLE cars_data (
    Car_ID INT,
    Year INT,
    Make TEXT,
    Model TEXT,
    Judge_ID TEXT,
    Judge_Name TEXT,
    Racer_Turbo INT,
    Racer_Supercharged INT,
    Racer_Performance INT,
    Racer_Horsepower INT,
    Car_Overall INT,
    Engine_Modifications INT,
    Engine_Performance INT,
    Engine_Chrome INT,
    Engine_Detailing INT,
    Engine_Cleanliness INT,
    Body_Frame_Undercarriage INT,
    Body_Frame_Suspension INT,
    Body_Frame_Chrome INT,
    Body_Frame_Detailing INT,
    Body_Frame_Cleanliness INT,
    Mods_Paint INT,
    Mods_Body INT,
    Mods_Wrap INT,
    Mods_Rims INT,
    Mods_Interior INT,
    Mods_Other INT,
    Mods_ICE INT,
    Mods_Aftermarket INT,
    Mods_WIP INT,
    Mods_Overall INT);
INSERT INTO cars_data SELECT Car_ID, Year, Make, Model, Judge_ID, Judge_Name, Racer_Turbo, Racer_Supercharged, Racer_Performance, Racer_Horsepower,
    Car_Overall, Engine_Modifications, Engine_Performance, Engine_Chrome, Engine_Detailing, Engine_Cleanliness,
    Body_Frame_Undercarriage, Body_Frame_Suspension, Body_Frame_Chrome, Body_Frame_Detailing, Body_Frame_Cleanliness,
    Mods_Paint, Mods_Body, Mods_Wrap, Mods_Rims, Mods_Interior, Mods_Other, Mods_ICE, Mods_Aftermarket, Mods_WIP, Mods_Overall
FROM data;

--create owner table 
CREATE TABLE owner(
    Car_ID TEXT PRIMARY KEY,
    Name TEXT,
    Email TEXT);  
INSERT INTO owner SELECT Car_ID, Name, Email  
FROM data;


