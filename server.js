// 3. import routes
// 6. call middleware


// imports express
const exp = require('constants');
const express = require('express');
// imports connection 
const db = require('./config/connection');
// TODO: import routes

const PORT = 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// TODO: use routes

// Why open?
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`)
    });
});