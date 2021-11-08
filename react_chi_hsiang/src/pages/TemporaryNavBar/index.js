import React,{Component} from "react";
import { Navbar,
 Form,
 Button, } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Axios from 'axios'; //處理POST
const TemporaryNavBar = () =>{
  const userAuthenticated=()=>{
    Axios.get('http://localhost:7000/authYN',{
       headers:{"x-access-token":localStorage.getItem("token"),
      },
    }).then((response)=>{
      if(!response.data.auth){


      }
      console.log(response);
      console.log(response.data.message);

    })
  }


 return (//BUTTONS

       <Form inline>
         <Link to="/login">
         <Button variant="outline-success">登入</Button>
         </Link>
         <Link to="/registerpage">
         <Button variant="outline-success">註冊</Button>
         </Link>
         <Link to="/memberpage">
         <Button variant="outline-success" onClick={userAuthenticated}>會員頁</Button>
         </Link>
         <Link to="/starpage">
         <Button variant="outline-success">star</Button>
         </Link>
       </Form>

 );
}
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


export default TemporaryNavBar;
