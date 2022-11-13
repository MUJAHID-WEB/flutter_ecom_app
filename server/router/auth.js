const express = require('express');  // this is importpackage
const bcryptjs = require('bcryptjs');  //for password secure
//Importing User model
const User = require('../models/user');
//Importing User model
const authRouter = express.Router(); //authRouter should import in index.js
const jwt = require("jsonwebtoken"); //for signUp this package import
const auth = require('../middlewares/auth');

authRouter.post("/api/signup", async (req, res)=>{ //testing API go to POSTMAN or extension thunder client
    try{
        // get the data from client by this
        const {name, email, password} = req.body; //using variables as objects
        //{'name': name, 'email': email, 'password': psword}
        // post the data in database importing mongoose in index.js and connect
        const existingUser = await User. findOne({ //mongoose property 'findOner' and  is a promise
            email
        });
        if (existingUser){
            return res.status(400).json ({
                msg: "User with same email address already exists!" //its clients error status 400
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 8); //for password secure bcryptjs package import at top
        //
        let user = new User({ //user object model with new property starting let or var keyword defining property
            email,
            password: hashedPassword,
            name,

        }); 
        user = await user.save(); //for MongoDB save use "await"
        //for send the data to user side
        res.json(user); //by default status code is 200
        
    }catch (e) {
        res.status(500).json({error: e.message}); //status 500 is for Server error responses 
    }
    


//HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:
//Informational responses (100–199)
//Successful responses (200–299)
//Redirection messages (300–399)
//Client error responses (400–499)
//Server error responses (500–599)

    // return that data to the user

    
});

// Singn in Route
authRouter.post("/api/signin", async (req, res) => { //bind this uri in client side
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {  //if User not exist
        return res
          .status(400)
          .json({ msg: "User with this email does not exist!" }); 
      }
  
      const isMatch = await bcryptjs.compare(password, user.password); //its a boolean value gives true or false
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." }); //Gaurd cluses
      }
  
      const token = jwt.sign({ id: user._id }, "passwordKey"); //jwt is called at top
      res.json({ token, ...user._doc }); // to send user data and add token
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // Sign In Route
// Exercise
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)  // bad request
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey"); // by this we can verify jwt is correct or not.
    res.json({ token, ...user._doc }); // to send the token with user data
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Following is the result of signin API
//http://localhost:3000/api/signin
//{
//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.//eyJpZCI6IjYzMmVjYWFlYzI5ZGYwNDkxMTg5ZDBiNSIsImlhdCI6MTY2NDgwMzE0OH0.//lZC22T0maN-bSsWIMpPjD_FWQ-md1pbMogwCFsPz57Y",
//  "_id": "632ecaaec29df0491189d0b5",
//  "name": "Mujahidul Islam",
//  "email": "mujahid07@gmail.com",
//  "password": "$2a$08$ECH.7fQCIWnyK6vLe9J0rull6/5S60mMQWPxB6vN899u.FrmME///3y",
//  "address": "",
//  "type": "user",
//  "__v": 0
//}
authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});
//To export this file use module.exports and set middleware in index.js
module.exports = authRouter;

