import React, { Component } from 'react';
import { Nav, Button, Dropdown, Alert } from 'react-bootstrap';
import { Tooltip } from 'reactstrap';
import AddAccounts from './AddAccounts';
import Background from '../images/bgfade.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAccountShow: false,
            isOpen: false,
            user: null,
            accounts: {
                facebook: false,
                twitter: false,
                linkedin: false,
                instagram: false
            },
            buttonarray: [],
            tip: false,
            background: "../images/bg.jpg"
        }
        this.handleInput = this.handleInput.bind(this);
    }



    async componentDidMount() {
        let u = await JSON.parse(localStorage.getItem("user"));
        let a = await JSON.parse(localStorage.getItem("accounts"));
        let b = await this.showButtons(a);
        await this.setState({
            user: u,
            accounts: a
        });
        await this.setState({ buttons: b });

        if (a.facebook == false && a.twitter == false && a.linkedin == false && a.instagram == false) {
            this.setState({ tip: true });
        }

    }




    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    showButtons(a) {
        let buttonarray = [];

        if (a.facebook === true) {
            buttonarray.push(
                <Nav.Link key="fb-a" onClick={(e) => this.handleInput(e, "facebook")} style={{ width: "100%", padding: "0" }}><img src={require('../images/fblogo.jpg')} alt=" "
                    style={{
                        padding: "0 0",
                        width: "90px",
                        border: "2px solid rgb(64,82,37)",
                        borderRadius: "20px"
                    }} /></Nav.Link>
            )
        }
        else {
            /* buttonarray.push(
                <Nav.Link key="fb-k" disabled style={{ width: "100%", padding: "0" }}><img src={require('../images/fbgray.jpg')} alt=" " style={{ padding: "0 0", width: "96px", border: "2px solid gray" }} /></Nav.Link>
            ) */
        }
        if (a.twitter === true) {
            buttonarray.push(
                <Nav.Link onClick={(e) => this.handleInput(e, "twitter")} style={{ width: "100%", padding: "0" }}><img src={require('../images/twitter.jpg')} alt=" "
                    style={{
                        padding: "0 0",
                        width: "90px",
                        border: "2px solid rgb(64,82,37)",
                        borderRadius: "20px"
                    }} /></Nav.Link>
            )
        }
        else {
            // buttonarray.push(
            //     <Nav.Link key="tw-k" disabled style={{ width: "100%", padding: "0" }}><img src={require('../images/twittergray.jpg')} alt=" " style={{ padding: "0 0", width: "96px", border: "2px solid gray" }} /></Nav.Link>
            // )
        }

        if (a.linkedin === true) {
            buttonarray.push(
                <Nav.Link onClick={(e) => this.handleInput(e, "linkedin")} style={{ width: "100%", padding: "0" }}><img src={require('../images/linkedin.jpg')} alt=" "
                    style={{
                        padding: "0 0",
                        width: "90px",
                        border: "2px solid rgb(64,82,37)",
                        borderRadius: "20px"
                    }} /></Nav.Link>
            )
        }
        else {
            /* buttonarray.push(
                <Nav.Link key="li-k" disabled style={{ width: "100%", padding: "0" }}><img src={require('../images/linkedingray.jpg')} alt=" " style={{ padding: "0 0", width: "96px", border: "2px solid gray" }} /></Nav.Link>
            ) */
        }

        if (a.instagram === true) {
            buttonarray.push(
                <Nav.Link onClick={(e) => this.handleInput(e, "instagram")} style={{ width: "100%", padding: "0" }}><img src={require('../images/insta.jpeg')} alt=" "
                    style={{
                        padding: "0 0",
                        width: "90px",
                        border: "2px solid rgb(64,82,37)",
                        borderRadius: "20px"
                    }} /></Nav.Link>
            )
        }
        else {
            /*  buttonarray.push(
                 <Nav.Link key="ig-k" disabled style={{ width: "100%", padding: "0" }}><img src={require('../images/instagray.jpeg')} alt=" " style={{ padding: "0 0", width: "96px", border: "2px solid gray" }} /></Nav.Link>
             ) */
        }


        return buttonarray;
    }

    handleInput(e, value) {
        let selected = value;
        localStorage.setItem('selected', selected);
        window.location.href = './homeExpanded';
    }



    render() {
        let addAccountClose = () => this.setState({ addAccountShow: false });
        return (
            <div style={{
                display: "flex",
                height: "90%"
            }}>
                <Nav defaultActiveKey="/home" sticky="left" className="flex-column" variant="pills" style={{ width: "100px", height: "100%", backgroundColor: "rgb(119,126,82)" }}>

                    <div>{this.state.buttons}</div>

                </Nav>
                <div style={{
                    padding: "20px", display: "flex", flexDirection: "column",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "cover",
                    backgroundAttachment: "fixed",
                    backgroundBlendMode: "lighten",
                    backgroundSize: "100%",
                    overflow: "auto",
                    width: "100%"
                }}>
                    <div style={{ display: "flex" }}>
                        <h1 style={{ color: "black", fontFamily: "Calibri", textShadow: "2px 2px #b3ab12", float: "left" }}>WELCOME, FIRST-NAME</h1>

                    </div>
                    <Alert variant="dark" show={this.state.tip} style={{ width: "350px", height: "40px", padding: "5px" }}>CLICK THE BUTTON TO ADD AN ACCOUNT</Alert>
                    <Button variant="outline-dark" onClick={() => this.setState({ addAccountShow: true })} style={{

                        width: "80px",
                        height: "80px",
                        backgroundColor: "rgb(255,240,207)",
                        boxShadow: "8px 8px 50px #000",
                        borderWidth: "2px",
                        fontSize: "xxx-large",
                        padding: "0",
                        textShadow: "1.5px 1.5px #b3ab12"
                    }}><div ><strong >+</strong></div></Button>

                    <AddAccounts
                        show={this.state.addAccountShow}
                        onHide={addAccountClose}
                        handler={this.handler} />
                </div>
            </div >
        )
    }
}

export default Home;