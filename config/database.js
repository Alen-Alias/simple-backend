const mongoose = require('mongoose')
require('dotenv').config()
const dbURL = process.env.dbURL
const database = mongoose.connect(`${dbURL}`).then(
    console.log('Databse connected')
)

module.exports=database