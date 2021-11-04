const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
// connect MySQL
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"test",
});


const app=express();
app.use(cors());
app.use(express.json());



app.listen(7000,()=>{
    console.log("FOXRunning Server");
});

app.post('/create', (req, res) => {
  const name = req.body.userNameReg;
  const email = req.body.userMailReg;
  const password = req.body.userPasswordReg;


  db.query("INSERT INTO users(name, email,password) VALUES (?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("FOXValues Inserted");
      }
    }
  );
});

