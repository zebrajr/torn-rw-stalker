require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Connected Successfully");
});

app.get("/",(req, res)=>{
    res.send("Yes, World");
});

console.log(process.env.PORT)
app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});
