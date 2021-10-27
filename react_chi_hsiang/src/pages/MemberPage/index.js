import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

// 使用react-bootstrap 和CSS
import './index.css';
import {Container,Row,Col,Stack,
 Form,
 FormControl,
 Button } from 'react-bootstrap';
//使用


// -----------------------Import End----------------


function FMemberPage(){
  return(
  <Container>
    <Row >
      <Col>
        <Stack gap={3}>
          <div className="bg-light border">First item</div>
          <div className="bg-light border">Second item</div>
          <div className="bg-light border">Third item</div>
        </Stack>
      </Col>
    </Row>
  </Container>
  )
}

export default FMemberPage;