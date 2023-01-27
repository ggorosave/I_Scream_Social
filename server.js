// imports express
const exp = require('constants');
const express = require('express');
// imports connection 
const db = require('./config/connection');
// imports routes
const routes = require('./routes')

const PORT = 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Why open?
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`)
    });
});