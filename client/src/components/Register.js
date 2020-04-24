import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card style={{
                    width: "50%",
                    margin: "20px auto 0 auto",
                    backgroundColor: "rgb(119,126,82)",
                    border: "3px solid rgb(64,82,37)"

                }}>

                    <Card.Title as="h2" style={{ textShadow: "2px 2px #b3ab12" }}>REGISTRATION</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 75.89px" }}>First Name</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="First name" style={{ width: "300px" }} />
                            </Form.Group>

                            <Form.Group controlId="validationCustom02">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 77.47px" }}>Last Name</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="Last name" style={{ width: "300px" }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 55.35px" }}>Email address</Form.Label>
                                <Form.Control size="sm" type="email" placeholder="Enter email" style={{ width: "300px" }} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 85.94px" }}>Password</Form.Label>
                                <Form.Control size="sm" type="password" placeholder="Password" style={{ width: "300px" }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 25px" }}>Confirm Password</Form.Label>
                                <Form.Control size="sm" type="password" placeholder="Password" style={{ width: "300px" }} />
                            </Form.Group>

                            <Button variant="outline-dark" type="submit" href="/home" style={{ borderWidth: "2px" }}>
                                <strong>Submit</strong>
                            </Button>
                        </Form>

                    </Card.Body>
                    <Card.Link style={{ color: "white" }} href="/login">Already Registered?</Card.Link>
                </Card>
            </div>
        );
    }
}

export default Register;