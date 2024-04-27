const express = require('express');
const app =express();
const mongoose = require('mongoose');
const routes = require('./routes')
const Port = process.env.PORT || 7000

mongoose.set('strictQuery', false);
// const dburl = "mongodb+srv://social-media:Password123@cluster0.d5zqv.mongodb.net/social?retryWrites=true&w=majority"
const dburl = 'mongodb+srv://anuragpandey:Password@atlas@cluster0.6weku61.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//Database  connection
mongoose.connect(dburl).then(function(){
    console.log("Connetcted to database")

    app.listen(Port, function(){
        console.log("server is running on :",Port)
    })
},function(error){
    console.log("Error in connecting to mongodb",error)
})


// middleware
app.use(express.json());
app.use(routes)


app.get("/",(req,res) => {
    res.send("welcome to home page");
})