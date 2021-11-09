const express = require("express"); //require:引入寫好的express模塊(library)
const cors = require("cors"); 
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const session = require("express-session");
// connect MySQL
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"test",
});

// 環境
const seloginAPI = express.Router();
const app=express();
app.use(cors());
app.use(express.json());  //讓express能處理json內容
app.listen(7000,()=>{
    console.log("FOXRunning Server");
}); //確定連到PORT7000

// 接註冊前端資料
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

//驗證功能authentication
const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        res.send("Yo, we need a token, plz give it to FOX!");
    } else{
        jwt.verify(token,"jwtSecret",(err,decoded)=>{
           if (err){
               res.json({auth:false,message:"U failed to authenticate"});
              //  return res.redirect('http://localhost:3000/login');   //ERR:ccess to XMLHttpRequest at 'http://localhost:3000/login' (redirected from 'http://localhost:7000/authYN') from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

           }else{
               req.userId = decoded.id;   //userId自行命名的參數
               next();
           }
        })
    }
}
app.get('/authYN',verifyJWT , (req,res)=>{ //verifyJWT:middleware 中介軟體
    // res.send("Yo, u r authenticated!!");
    // const memberId = req.body.memberId;
     db.query("SELECT * FROM users WHERE id=? ",
       [req.userId],
         (err, result) => {
          if (err) {
             console.log(err);
           } else {
             res.send(result);
          }
        }
    );
  
})


// 接登入前端資料
app.post('/login', (req, res) => {
  const mailLog = req.body.mailLog;
  const passwordLog = req.body.passwordLog;

  db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
    [ mailLog, passwordLog],
    (err, result) => {
      if (err) {
        res.send({err:err});
      } 
      
      
      if(result.length > 0){
        // res.send(result);
        // res.send("登入成功");
        //遷移資料庫後可能要改id->user_id
        const id =  result[0].id
        const token =jwt.sign({id},'jwtSecret',{
            expiresIn:300, //about 5mins.
        })
        // req.session.user = result;
        res.json({auth:true, token:token,result:result}); 

      }else {
        // res.send({message:"Wrong username/password combination~~~"});
        // res.send(result);
        res.json({auth:false,message:"Wrong username/password combination~~~"}); 
      }
    }
  );
});

