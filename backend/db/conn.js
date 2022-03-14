const mongoose = require('mongoose');
require('dotenv').config()

const db = `${ process.env.DB_CONNECTION }`
mongoose.connect(db).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err)
})
