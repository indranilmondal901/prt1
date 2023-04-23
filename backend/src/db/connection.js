const mongoose = require("mongoose");
const uri = "mongodb+srv://indranilmondal901:abcd1234@cluster0.dem6ftb.mongodb.net/?retryWrites=true&w=majority"
//connection
mongoose.connect(uri,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Your DB is sucessfully connected with Node.js")
}).catch((err)=>{
    console.log("Connection Failed due to "+ err)
})
