const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('cars.db', (err) => {
    if (err) {
        // throw an error if cannot connect to database
        console.error("Erro opening database " + err.message);
    } else {
        // display a message to the console if successfully connected to the database
        console.log('Connected to the SQLite database.')
    }
});


// export the database so it can be used by other files
module.exports = db
