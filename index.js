require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const main = require('./routes/main.js');
const uri = process.env.URI

const connect = async (params) => {
    try {
        await mongoose.connect(uri)
        console.log("mongoDB connected");
    } catch (error) {
        console.error(error);
    }
}

connect()

app.use(express.json());
app.use(cors())

app.use('/api', main);

app.listen(8000, () => {
    console.log("server started on port 8000");
})
