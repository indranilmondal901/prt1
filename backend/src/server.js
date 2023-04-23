const express = require("express");
const cors = require('cors');
// const dotenv = require("dot-env");
// dotenv.config()
const PORT = process.env.PORT || 8080;
const app =express();

//connection
require("./db/connection");
//route
const router = require("./routes/route")
//middlewire
app.use(cors());
app.use(express.json());
app.use(router);

//listen
app.listen(PORT,()=>{
    console.log("Your server is running on port no "+ PORT)
})