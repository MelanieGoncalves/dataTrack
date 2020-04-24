import React, { Component } from 'react';
import { Nav, Button, NavItem, NavLink, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Collapse, Card, CardBody } from 'reactstrap';
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
            friendsIsOpen: false,
            postsIsOpen: false,
            likesIsOpen: false,
            commentsIsOpen: false,
            sharesIsOpen: false,
            showGraphPanel: false,
            graphs: []

        }

    }

    async componentDidMount() {
        let u = await JSON.parse(localStorage.getItem("user"));
        let a = await JSON.parse(localStorage.getItem("accounts"));
        let b = await this.showButtons(a);
        let g = [];
        /* if (JSON.parse(localStorage.getItem('graphs')).graphs != null) {
            g = await JSON.parse(localStorage.getItem('graphs')).graphs;
        } */
        await this.setState({
            user: u,
            accounts: a,
            selected: localStorage.getItem('selected'),
            // graphs: g
        });
        await this.setState({ buttons: b });

    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleMenuFriends = () => {
        this.setState({
            friendsIsOpen: !this.state.friendsIsOpen
        });
    }

    toggleMenuPosts = () => {
        this.setState({
            postsIsOpen: !this.state.postsIsOpen
        });
    }

    toggleMenuLikes = () => {
        this.setState({
            likesIsOpen: !this.state.likesIsOpen
        });
    }

    toggleMenuComments = () => {
        this.setState({
            commentsIsOpen: !this.state.commentsIsOpen
        });
    }

    toggleMenuShares = () => {
        this.setState({
            sharesIsOpen: !this.state.sharesIsOpen
        });
    }

    showButtons(a) {
        let buttonarray = [];

        if (a.facebook === true) {
            if (localStorage.getItem('selected') == 'facebook') {
                buttonarray.push(
                    <Nav.Link key="fb-a" href="/home" style={{ width: "100%", padding: "0" }}><img src={require('../images/fblogo.jpg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
            else {
                buttonarray.push(
                    <Nav.Link key="fb-k" onClick={(e) => this.handleInput(e, "facebook")} style={{ width: "100%", padding: "0" }}><img src={require('../images/fbgray.jpg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }

        }

        if (a.twitter === true) {
            if (localStorage.getItem('selected') == 'twitter') {
                buttonarray.push(
                    <Nav.Link href="/home" style={{ width: "100%", padding: "0" }}><img src={require('../images/twitter.jpg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
            else {
                buttonarray.push(
                    <Nav.Link key="tw-k" onClick={(e) => this.handleInput(e, "twitter")} style={{ width: "100%", padding: "0" }}><img src={require('../images/twittergray.jpg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
        }


        if (a.linkedin === true) {
            if (localStorage.getItem('selected') == 'linkedin') {
                buttonarray.push(
                    <Nav.Link href="/home" style={{ width: "100%", padding: "0" }}><img src={require('../images/linkedin.jpg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
            else {
                buttonarray.push(
                    <Nav.Link key="li-k" onClick={(e) => this.handleInput(e, "linkedin")} style={{ width: "100%", padding: "0" }}><img src={require('../images/linkedingray.jpg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
        }


        if (a.instagram === true) {
            if (localStorage.getItem('selected') == 'instagram') {
                buttonarray.push(
                    <Nav.Link href="/home" style={{ width: "100%", padding: "0" }}><img src={require('../images/insta.jpeg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
            else {
                buttonarray.push(
                    <Nav.Link key="ig-k" onClick={(e) => this.handleInput(e, "instagram")} style={{ width: "100%", padding: "0" }}><img src={require('../images/instagray.jpeg')} alt=" "
                        style={{
                            padding: "0 0",
                            width: "90px",
                            border: "2px solid rgb(64,82,37)",
                            borderRadius: "20px"
                        }} /></Nav.Link>
                )
            }
        }



        return buttonarray;
    }

    handleInput(e, value) {
        let selected = value;
        localStorage.setItem('selected', selected);
        this.setState({ 'selected': value });
        window.location.href = './homeExpanded';
    }

    showGraph() {
        let graphPanel = (
            <div style={{ height: "100%", padding: "30px", display: "flex", flexDirection: "column", padding: "10px", backgroundColor: "rgb(250,242,221)" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>
                <img src={require('../images/dummygraph.jpg')} />
                <div>
                    <Button onClick={() => { this.saveGraph() }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }

    openPanel() {
        console.log("Test");
        this.setState({ graphPanel: this.showGraph(), showGraphPanel: true });

    }

    closePanel() {
        this.setState({ graphPanel: null, showGraphPanel: false });
    }

    saveGraph() {
        let graphsObj = {
            graphs: this.state.graphs
        };
        graphsObj.graphs.push(
            <div style={{ padding: "10px" }}>
                <img src={require('../images/dummygraph.jpg')} />
            </div>
        )
        this.setState({ graphs: graphsObj.graphs });
        localStorage.setItem('graphs', JSON.stringify(graphsObj));
    }


    render() {
        let addAccountClose = () => this.setState({ addAccountShow: false });
        return (
            <div style={{ display: "flex", height: "90%" }}>
                <Nav defaultActiveKey="/home" sticky="left" className="flex-column" style={{ width: "100px", height: "100%", backgroundColor: "rgb(119,126,82)" }}>

                    <div>{this.state.buttons}</div>

                </Nav>
                <div style={{
                    display: "flex",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "cover",
                    backgroundAttachment: "fixed",
                    backgroundSize: "100%",
                    overflow: "auto",
                    width: "100%", height: "100%"
                }}>
                    <div style={{ width: "15%", minWidth: "150px", backgroundColor: "rgb(211,209,135)", height: "100%" }}>
                        <Nav style={{ width: "100%", height: "100%" }}>
                            <div style={{ float: "center", width: "100%" }}>
                                <p style={{
                                    textTransform: "uppercase",
                                    textShadow: "1.5px 1.5px #b3ab12",
                                    fontFamily: "Calibri",
                                    fontSize: "x-large",
                                    color: "rgb(64,82,37)",
                                    border: "2px solid rgb(64,82,37)",
                                    padding: "20px",
                                    margin: "0",
                                    borderTop: "none"
                                }}><strong>{this.state.selected}</strong></p>
                            </div>

                            <NavItem style={{ width: "100%", height: "100%" }}>
                                <NavLink onClick={this.toggleMenuFriends} style={{
                                    color: "white",
                                    border: "1px solid white",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "2px 2px #b3ab12"
                                }}>FRIENDS</NavLink>
                                <Collapse isOpen={this.state.friendsIsOpen}>
                                    <Card>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark" >LAST POST</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST HOUR</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST DAY</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST WEEK</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuPosts} style={{
                                    color: "white",
                                    border: "1px solid white",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "2px 2px #b3ab12"
                                }}>POSTS</NavLink>
                                <Collapse isOpen={this.state.postsIsOpen}>
                                    <Card>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST POST</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST HOUR</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST DAY</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST WEEK</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuLikes} style={{
                                    color: "white",
                                    border: "1px solid white",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "2px 2px #b3ab12"
                                }}>LIKES</NavLink>
                                <Collapse isOpen={this.state.likesIsOpen}>
                                    <Card>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST POST</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST HOUR</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST DAY</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST WEEK</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuComments} style={{
                                    color: "white",
                                    border: "1px solid white",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "2px 2px #b3ab12"
                                }}>COMMENTS</NavLink>
                                <Collapse isOpen={this.state.commentsIsOpen}>
                                    <Card>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST POST</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST HOUR</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST DAY</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST WEEK</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuShares} style={{
                                    color: "white",
                                    border: "1px solid white",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "2px 2px #b3ab12"
                                }}>SHARES</NavLink>
                                <Collapse isOpen={this.state.sharesIsOpen}>
                                    <Card>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST POST</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST HOUR</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST DAY</Button>
                                        <Button onClick={() => this.openPanel()} variant="outline-dark">LAST WEEK</Button>
                                    </Card>
                                </Collapse>
                            </NavItem>
                        </Nav>
                    </div>

                    <div style={{ height: "100%" }}>
                        <Collapse style={{ height: "100%" }} isOpen={this.state.showGraphPanel}>
                            <Card style={{ height: "100%" }}>{this.state.graphPanel}</Card>
                        </Collapse>
                    </div>
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                        <Button variant="outline-dark" onClick={() => this.setState({ addAccountShow: true })} style={{
                            marginTop: "20px",
                            width: "80px",
                            height: "80px",
                            backgroundColor: "rgb(250,242,221)",
                            boxShadow: "8px 8px 50px #000",
                            borderWidth: "2px",
                            fontSize: "3em",
                            padding: "0",
                            textShadow: "2px 2px #b3ab12"
                        }}><strong>+</strong></Button>
                        <AddAccounts
                            show={this.state.addAccountShow}
                            onHide={addAccountClose}
                            handler={this.handler} />
                    </div>
                    <div style={{

                    }}>
                        {this.state.graphs}
                    </div>
                </div>
            </div >
        )
    }
}

export default Home;