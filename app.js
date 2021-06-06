const express = require ("express");
const bodyparser = require ("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({
  extended:true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useUnifiedTopology: true, useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// const secret = "Thisisascerect.";
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });


const User = new mongoose.model("User", userSchema);

app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.post("/register", function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (!err){
      res.render("secrets");
    } else {
      res.send(err);
    }
  });
});

app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password){
          res.render("secrets");
        } else {
          res.send("Worng Password!");
        }
      }
    }
  });
});



app.listen(3000, function(){
  console.log("server is runing on port 3000.");
})