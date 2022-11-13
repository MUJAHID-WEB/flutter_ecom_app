// Import rom Packages
const express = require('express');  // this is importpackage
const mongoose = require('mongoose'); // for posting data in database from auth.js
const DB = "mongodb+srv://ecom:987654321@cluster0.4b5rkcy.mongodb.net/?retryWrites=true&w=majority";
//Import from othwer files
const authRouter = require("./router/auth");
const adminRouter = require("./router/admin");
const productRouter = require("./router/product");
const userRouter = require("./routes/user");
//Init
const PORT = process.env.PORT || 3000;

const app = express(); // express initialize by app variable which never going to change 


//middleware
//Client -> middleware -> Server ->Client
app.use(express.json());
app.use(authRouter);
app.use(adminRouter); // set it on top as import 
app.use(productRouter);
app.use(userRouter);

// Connection 
mongoose
    .connect(DB) // DB is connected with MongoDB at top
    .then(()=>{
    console.log("Connection Successful")
}).catch((e)=>{
    console.log(e);

});



// creating API
// http://<myIPadress>/hello-world
//
app.get('/hello-world', (req, res)=>{
    res.send("hello world");
});
app.get('/myself', (req, res) => {
    res.send("This is me.")
});
//json
app.get('/hello', (req, res)=>{
    res.json({hi: "hello world"});
});
app.get('/', (req, res)=>{
    res.json({name: "Mujahid"});
});
//  GET, PUT, POST, DELETE, UPDATE -> CRUD

app.listen(
    PORT,  // for connection
    "0.0.0.0", // IP address / url
    () => {  // CALLBACK function
      //  console.log('connected at port' + PORT);
      console.log(`connected at ${PORT}`);
    }

);

