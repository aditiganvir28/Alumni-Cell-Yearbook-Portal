require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userDataRoutes = require('./routes/userDataRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const port = process.env.PORT || 5000;

//We are using cors to allow cross-origin requests. 
//We are using app.use() to add the cors middleware to the Express application.

//To parse the incoming requests with JSON payloads we are using express.json() 
//which is a built-in middleware function in Express.

//Middlewares
app.use(
    cors({
        origin: [`http://localhost:3000`],
        methods: ["GET", "POST", "UPDATE"],
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req,res)=>{
    // res.json({message: "Hello from server!!"});
    res.send("Hello from server");
})


app.listen(port,(err) =>{
    if(err){
        console.log(err);
    }
    else{
    console.log(`Listening on port ${port}!`);
    }
})

mongoose.connect("mongodb://localhost:27017/yearbook-portal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>{
        console.log("DB Connection Succesfull");
})
    .catch((err)=>{
        console.log(err.message);
});

app.use(userRoutes);
app.use(userDataRoutes);