import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { app } from '../utils/AxiosConfig';

class AddAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: " ",
                fb: false,
                first_name: " ",
                ig: false,
                last_name: " ",
                li: false,
                password: " ",
                tw: false,
                __v: 0,
                _id: " "
            },
            fb: false,
            tw: false,
            li: false,
            ig: false
        }
    }

    componentDidMount() {
        /* let urlparser = require('url');
        console.log(window.location.href);
        let url = urlparser.parse(window.location.href, true);
        let userid = url.path.substr(6); */
        let userid = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userid);

        app.get('api/user/' + userid)
            .then(user => {
                console.log(user);
                this.setState({
                    user: user.data.user,

                });
            }).catch(err => {
                console.log(err);
            })
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        //let label = `${name}label`;
        console.log(value);
        //   document.getElementById(label).style.color = "rgb(64,82,37)";
        //  document.getElementById(label).style.backgroundColor = "rgb(255,232,163)";
    }

    submit = e => {
        window.location.href = "/home/" + JSON.parse(localStorage.getItem('user'))._id;
    }

    addFB() {
        // let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            fb: true,
            tw: this.state.tw,
            li: this.state.li,
            ig: this.state.ig
        }

        app.put('api/accounts/' + JSON.parse(localStorage.getItem('user'))._id, accounts)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        this.setState({ fb: true });
        document.getElementById('fblabel').style.color = "rgb(64,82,37)";
        document.getElementById('fblabel').style.backgroundColor = "rgb(255,232,163)";
    }

    addTW() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            fb: this.state.fb,
            tw: true,
            li: this.state.li,
            ig: this.state.ig
        }
        app.put('api/accounts/' + JSON.parse(localStorage.getItem('user'))._id, accounts)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        this.setState({ tw: true });
        document.getElementById('twlabel').style.color = "rgb(64,82,37)";
        document.getElementById('twlabel').style.backgroundColor = "rgb(255,232,163)";
    }

    addLI() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            fb: this.state.fb,
            tw: this.state.tw,
            li: true,
            ig: this.state.ig
        }
        app.put('api/accounts/' + JSON.parse(localStorage.getItem('user'))._id, accounts)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        this.setState({ li: true });
        document.getElementById('lilabel').style.color = "rgb(64,82,37)";
        document.getElementById('lilabel').style.backgroundColor = "rgb(255,232,163)";
    }

    addIG() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            fb: this.state.fb,
            tw: this.state.tw,
            li: this.state.li,
            ig: true
        }
        app.put('api/accounts/' + JSON.parse(localStorage.getItem('user'))._id, accounts)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        this.setState({ ig: true });
        document.getElementById('iglabel').style.color = "rgb(64,82,37)";
        document.getElementById('iglabel').style.backgroundColor = "rgb(255,232,163)";
    }

    render() {
        return (
            <div >
                <Modal

                    {...this.props}

                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <Modal.Header closeButton style={{ backgroundColor: "#4F600D", border: "none" }}>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ color: "white", textShadow: "1.5px 1.5px #b3ab12" }}>
                            ADD ACCOUNTS
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "rgb(255,250,240)", border: "none" }}>
                        <h4>Centered Modal</h4>
                        <Form style={{ display: "flex" }}>



                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button name="fb" variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0", borderRadius: "10px" }} onClick={(e) => { this.addFB(e) }} ><img src={require('../images/fblogo.jpg')} alt="fb" style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(255,250,240)", marginTop: "15px", borderRadius: "5px" }} id="fblabel" >Facebook Added</Form.Label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button name="tw" variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0" }} onClick={(e) => { this.addTW(e) }} ><img alt="twitter" src={require('../images/twitter.jpg')} style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(255,250,240)", marginTop: "15px", borderRadius: "5px" }} id="twlabel" >Twitter Added</Form.Label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button name="li" variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0" }} onClick={(e) => { this.addLI(e) }} ><img alt="linkedin" src={require('../images/linkedin.jpg')} style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(255,250,240)", marginTop: "15px", borderRadius: "5px" }} id="lilabel" >LinkedIn Added</Form.Label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button name="ig" variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0" }} onClick={(e) => { this.addIG(e) }} ><img src={require('../images/insta.jpeg')} alt="instagram" style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(255, 250, 240)", marginTop: "15px", borderRadius: "5px" }} id="iglabel" >Instagram Added</Form.Label>
                            </div>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "rgb(146, 160, 62)", border: "none" }}>
                        <Button style={{ borderWidth: "2px" }} variant="outline-dark" onClick={(e) => { this.submit(e) }}><strong>DONE</strong></Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default AddAccounts;