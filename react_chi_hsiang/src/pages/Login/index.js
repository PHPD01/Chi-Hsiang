import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import './index.css';
import { Container,Row,Col,Stack,
 Form,
 FormControl,
 Button, } from 'react-bootstrap';
import Axios from 'axios'; //處理POST
//  -----------------------IMPORT結束-------------------



function FLoginPage(){
  const [mailLog,setMailLog]=useState('');
  const [passwordLog,setPasswordLog]=useState('');
  // const showInfo = () =>{console.log(mailLog,passwordLog);}; //測試1.
  const [loginStatus,setLoginStatus]=useState(false);
  const loginFoodWeb =()=>{
   Axios.post('http://localhost:7000/login',
    { 
      mailLog:mailLog,
      passwordLog:passwordLog,
    }).then((response)=>{
      // if(response.data.message){ //沒登入成功的話
      if(!response.data.auth){
        // setLoginStatus(response.data.message);
        // alert(response.data.message);
        setLoginStatus(false);
      }else{
        // setLoginStatus(response.data[0].name);
        console.log(response.data);
        alert(response.data.result[0].name+"，歡迎回來");
        localStorage.setItem("token",response.data.token);
        setLoginStatus(true);

      }
      console.log(response);
      });
  };

  const userAuthenticated=()=>{
    Axios.get('http://localhost:7000/authYN',{
       headers:{"x-access-token":localStorage.getItem("token"),
      },
    }).then((response)=>{
      console.log(response);
              alert("歡迎驗證");

    })
  }

  return (
  <Container>
    <Row >
      <Col>
          <Form className="col-md-5 mx-auto frame my-5">
          <h5 id="loginTitle" className="line">登入 Login</h5>
            <Form.Group className="mb-3" controlId="username">
            <Form.Label column="lg">登入帳號(即為您的電子郵件)</Form.Label>
            <Form.Control type="email" size="lg" placeholder="Enter email" 
                          onChange={(e)=>{
                            setMailLog(e.target.value);}}/>
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="login_password">
              <Form.Label column="lg">密碼</Form.Label>
              <Form.Control type="password" size="lg" placeholder="Password" 
                          onChange={(e)=>{setPasswordLog(e.target.value);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Stack gap={2} className="col-md-6 mx-auto">
            <Button variant="" type="" className=" buttonStyle"
                    //onClick={showInfo} 
                    onClick={loginFoodWeb}
                    >
              登入
            </Button>
            <Link to="/registerpage" >
               <Button variant="" type=""className="w-100 buttonStyle">
                註冊帳號
               </Button>
            </Link>
            <Button variant="" type="" className=" buttonStyle">
              回首頁
            </Button>
            {/* <h1>{loginStatus}</h1> */}
            {loginStatus &&(
              <button
                     onClick={userAuthenticated}>Check if authenticated</button>
            )}
            </Stack>
          </Form>
      </Col>
    </Row>
  </Container>

);


}

export default FLoginPage;

