const express = require("express");
const mysql = require("mysql");
// connect MySQL
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"test",
});


const app=express();

app.use(express.json());



app.listen(3002,()=>{
    console.log("Running Server");
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;


  db.query(`INSERT INTO account(name, email,password) VALUES ('${name}', '${email}',"${password}`,
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});