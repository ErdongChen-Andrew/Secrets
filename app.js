require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
<<<<<<< HEAD
const bcrypt = require("bcrypt");
// const md5 = require("md5");
=======
const md5 = require("md5");
>>>>>>> 1394cf705ccbe6c8ae7fa6e300afc8d3fbb38d4b
// const encrypt = require("mongoose-encryption");

const app = express();

const saltRounds = 10;

// console.log(process.env.SECRET);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// const secret = "Thisisascerect.";
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });


const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

<<<<<<< HEAD
app.post("/register", function(req, res) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err) {
      if (!err) {
        res.render("secrets");
      } else {
        res.send(err);
      }
    });
=======
app.post("/register", function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  });
  newUser.save(function(err){
    if (!err){
      res.render("secrets");
    } else {
      res.send(err);
    }
>>>>>>> 1394cf705ccbe6c8ae7fa6e300afc8d3fbb38d4b
  });


});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({
    email: username
  }, function(err, foundUser) {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if (result == true) {
            res.render("secrets");
          } else {
            res.send("Worng Password!");
          }
        });
      }
    }
  });
});



app.listen(3000, function() {
  console.log("server is runing on port 3000.");
})
