import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class AddAccounts extends Component {
    constructor(props) {
        super(props);
    }

    addFB() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            facebook: true,
            twitter: currentaccounts.twitter,
            linkedin: currentaccounts.linkedin,
            instagram: currentaccounts.instagram
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
        document.getElementById('fblabel').style.color = "rgb(64,82,37)";
        document.getElementById('fblabel').style.backgroundColor = "rgb(255,232,163)";
    }

    addTW() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            facebook: currentaccounts.facebook,
            twitter: true,
            linkedin: currentaccounts.linkedin,
            instagram: currentaccounts.instagram
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
        document.getElementById('twlabel').style.color = "rgb(64,82,37)";
        document.getElementById('twlabel').style.backgroundColor = "rgb(255,232,163)";
    }

    addLI() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            facebook: currentaccounts.facebook,
            twitter: currentaccounts.twitter,
            linkedin: true,
            instagram: currentaccounts.instagram
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
        document.getElementById('lilabel').style.color = "rgb(64,82,37)";
        document.getElementById('lilabel').style.backgroundColor = "rgb(255,232,163)";
    }

    addIG() {
        let currentaccounts = JSON.parse(localStorage.getItem('accounts'));
        let accounts = {
            facebook: currentaccounts.facebook,
            twitter: currentaccounts.twitter,
            linkedin: currentaccounts.linkedin,
            instagram: true
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
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
                    <Modal.Body style={{ backgroundColor: "rgb(174,201,135)", border: "none" }}>
                        <h4>Centered Modal</h4>
                        <Form style={{ display: "flex" }}>



                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0", borderRadius: "10px" }} onClick={this.addFB} ><img src={require('../images/fblogo.jpg')} alt=" " style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(174,201,135)", marginTop: "15px", borderRadius: "5px" }} id="fblabel" >Facebook Added</Form.Label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0" }} onClick={this.addTW} ><img src={require('../images/twitter.jpg')} style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(174,201,135)", marginTop: "15px", borderRadius: "5px" }} id="twlabel" >Twitter Added</Form.Label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0" }} onClick={this.addLI} ><img src={require('../images/linkedin.jpg')} style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(174,201,135)", marginTop: "15px", borderRadius: "5px" }} id="lilabel" >LinkedIn Added</Form.Label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Button variant="outline-dark" style={{ backgroundColor: "transparent", border: "none", padding: "0" }} onClick={this.addIG} ><img src={require('../images/insta.jpeg')} alt=" " style={{ height: "100px", borderRadius: "25px" }} /></Button>
                                <Form.Label style={{ color: "rgb(174,201,135)", marginTop: "15px", borderRadius: "5px" }} id="iglabel" >Instagram Added</Form.Label>
                            </div>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "rgb(146, 160, 62)", border: "none" }}>
                        <Button style={{ borderWidth: "2px" }} variant="outline-dark" onClick={() => { window.location = "/home" }}><strong>DONE</strong></Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default AddAccounts;