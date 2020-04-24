import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    login() {
        let user = {
            firstname: "firstname",
            lastname: "lastname",
            email: "email"
        }
        let accounts = {
            facebook: false,
            twitter: false,
            linkedin: false,
            instagram: false
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accounts', JSON.stringify(accounts));
        window.location = "/home";
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

                    <Card.Title>LOG IN</Card.Title>
                    <Card.Body>
                        <Form>


                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 50px" }}>Email address</Form.Label>
                                <Form.Control size="sm" type="email" placeholder="Enter email" style={{ width: "300px" }} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 80.59px" }}>Password</Form.Label>
                                <Form.Control size="sm" type="password" placeholder="Password" style={{ width: "300px" }} />
                            </Form.Group>


                            <Button variant="outline-dark" type="submit" onClick={this.login} href="/home" style={{ borderWidth: "2px" }}>
                                <strong>LOG IN</strong>
                            </Button>

                        </Form>

                    </Card.Body>
                    <Card.Link style={{ color: 'white' }} href="/register">Not Registered?</Card.Link>

                </Card>
            </div>
        )
    }
}

export default Login;