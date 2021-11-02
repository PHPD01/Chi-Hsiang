const mysql = require("mysql");

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"test",

});

app.listen(3001,()=>{
    console.log("Running Server");
});