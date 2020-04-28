import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { app } from '../utils/AxiosConfig';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    submit = e => {
        e.preventDefault();
        const { username, password } = this.state;

        app.post('api/login', {
            username: username,
            password: password
        }).then(response => {
            console.log(response);
            if (response.data.registered) {
                window.localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location = '/home/' + response.data.user._id;
            } else {
                if (response.data.issue && response.data.issue === "user not found") {
                    alert('User email is not found');
                }
                else if (response.data.issue && response.data.issue === "invalid password") {
                    alert("Invalid password");
                }
                else {
                    alert('Something went wrong');
                }

            }
        }).catch(err => {
            console.log(err);
        })
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
                        <Form onSubmit={this.submit}>


                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 50px" }}>Email address</Form.Label>
                                <Form.Control size="sm" name="username" type="email" placeholder="Enter email"
                                    style={{ width: "300px" }} onChange={this.handleChange} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={{ float: "left", margin: "0 30px 0 80.59px" }}>Password</Form.Label>
                                <Form.Control size="sm" name="password" type="password" placeholder="Password"
                                    style={{ width: "300px" }} onChange={this.handleChange} />
                            </Form.Group>


                            <Button variant="outline-dark" type="submit" style={{ borderWidth: "2px" }}>
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