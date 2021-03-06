import React, { Component } from 'react';
import '../styles/HomeExpanded.css';
import { Nav, Button, NavItem, NavLink } from 'react-bootstrap';
import { Collapse, Card } from 'reactstrap';
import AddAccounts from './AddAccounts';
import { app } from '../utils/AxiosConfig';
import { Bar } from 'react-chartjs-2';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addAccountShow: false,
            isOpen: false,
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
                _id: " ",
                graphs: []
            },
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
            graphs: [],
            showGraphPanel: false,
            /* chartData: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            } */

        }

    }

    async componentDidMount() {
        /*  let u = await JSON.parse(localStorage.getItem("user"));
         let a = await JSON.parse(localStorage.getItem("accounts"));
         let b = await this.showButtons(a);
         //let g = [];
         /* if (JSON.parse(localStorage.getItem('graphs')).graphs != null) {
             g = await JSON.parse(localStorage.getItem('graphs')).graphs;
         } 
         await this.setState({
             user: u,
             accounts: a,
             selected: localStorage.getItem('selected'),
             // graphs: g
         });
         await this.setState({ buttons: b }); */
        let urlparser = require('url');
        console.log(window.location.href);
        let url = urlparser.parse(window.location.href, true);
        console.log(url.path.substr(14));
        let userid = url.path.substr(14);
        console.log('api/user/' + userid);
        this.getData();
        app.get('api/user/' + userid)
            .then(user => {
                console.log(user);
                this.setState({
                    user: user.data.user,
                    accounts: {
                        facebook: user.data.user.fb,
                        twitter: user.data.user.tw,
                        linkedin: user.data.user.li,
                        instagram: user.data.user.ig
                    },
                    graphs: user.data.user.graphs,
                    selected: localStorage.getItem('selected'),
                    buttons: this.showButtons(user.data.user),
                    displaySavedGraphs: this.showSavedGraphs(user.data.user.graphs)
                });

            }).catch(err => {
                console.log(err);
            })

    }

    showSavedGraphs(graphs) {
        let displayArr = [];
        if (graphs) {
            let graphArr = graphs;
            console.log(graphArr);
            for (let i = 0; i < graphArr.length; i++) {
                let graphObj = {
                    labels: graphArr[i].labels,
                    datasets: [{
                        data: graphArr[i].datasets[0].data,
                        backgroundColor: graphArr[i].datasets[0].backgroundColor,
                        borderColor: graphArr[i].datasets[0].borderColor,
                        borderWidth: 1
                    }]

                }
                console.log(graphObj);
                displayArr.push(
                    <div key={i}>
                        <Bar
                            data={graphObj}

                            options={{ responsive: true, maintainAspectRatio: true }} />/>


                    </div>
                )
            }
        }

        return displayArr;
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
        console.log(a);
        let buttonarray = [];

        if (a.fb === true) {
            if (localStorage.getItem('selected') === 'facebook') {
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

        if (a.tw === true) {
            console.log(localStorage.getItem('selected'));
            if (localStorage.getItem('selected') === 'twitter') {
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


        if (a.li === true) {
            if (localStorage.getItem('selected') === 'linkedin') {
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


        if (a.ig === true) {
            if (localStorage.getItem('selected') === 'instagram') {
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

    getData(type) {

        let postDay = {
            labels: ['Likes', 'Comments', 'Shares'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        let postWeek = {
            labels: ['Likes', 'Comments', 'Shares'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        let postMonth = {
            labels: ['Likes', 'Comments', 'Shares'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        let postYear = {
            labels: ['Likes', 'Comments', 'Shares'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        let weekData = {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(56, 150, 200, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(56, 150, 200, 1)'
                ],
                borderWidth: 1
            }]
        }

        let monthData = {
            labels: ['Week 1', 'Week ', 'Week 3', 'Week4'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }

        let yearData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: '# of Votes',
                data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
        this.setState({
            postDay: postDay,
            postWeek: postWeek,
            postMonth: postMonth,
            postYear: postYear,
            weekData: weekData,
            monthData: monthData,
            yearData: yearData
        });
        //   console.log(this.state.chartData);



    }
    showPostDayGraph() {
        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>

                <Bar

                    data={this.state.postDay}

                    options={{ responsive: true, maintainAspectRatio: true }} />


                <div>
                    <Button onClick={() => { this.saveGraph(this.state.postDay) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }
    showPostWeekGraph() {
        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>

                <Bar

                    data={this.state.postWeek}

                    options={{ responsive: true, maintainAspectRatio: true }} />


                <div>
                    <Button onClick={() => { this.saveGraph(this.state.postWeek) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }
    showPostMonthGraph() {
        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>

                <Bar

                    data={this.state.postMonth}

                    options={{ responsive: true, maintainAspectRatio: true }} />


                <div>
                    <Button onClick={() => { this.saveGraph(this.state.postMonth) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }
    showPostYearGraph() {
        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>

                <Bar

                    data={this.state.postYear}

                    options={{ responsive: true, maintainAspectRatio: true }} />


                <div>
                    <Button onClick={() => { this.saveGraph(this.state.postYear) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }

    showWeekGraph() {

        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>
                <Bar data={this.state.weekData} options={{ responsive: true, maintainAspectRatio: true }} />
                <div>
                    <Button onClick={() => { this.saveGraph(this.state.weekData) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }

    showMonthGraph() {
        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>
                <Bar data={this.state.monthData} options={{ responsive: true, maintainAspectRatio: true }} />
                <div>
                    <Button onClick={() => { this.saveGraph(this.state.monthData) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }

    showYearGraph() {

        let graphPanel = (
            <div id="panel" style={{ height: "100%", width: "500px" }}>
                <div>
                    <Button onClick={() => { this.closePanel() }} style={{ width: "40px", height: "40px", float: "right", marginBottom: "10px" }} variant="outline-danger"><strong>X</strong></Button>
                </div>
                <Bar data={this.state.yearData} options={{ responsive: true, maintainAspectRatio: true }} />
                <div>
                    <Button onClick={() => { this.saveGraph(this.state.yearData) }} style={{ float: "center", marginTop: "10px", borderWidth: "2px" }} variant="outline-dark"><strong>SAVE</strong></Button>
                </div>
            </div>
        );
        return graphPanel;
    }



    openPanel(e) {
        let type = e.target.value;
        //console.log(type);
        this.setState({ data: type });
        if (type === 'post-day') {
            this.setState({ graphPanel: this.showPostDayGraph(type), showGraphPanel: true });
        }
        else if (type === 'post-week') {
            this.setState({ graphPanel: this.showPostWeekGraph(type), showGraphPanel: true });
        }
        else if (type === 'post-month') {
            this.setState({ graphPanel: this.showPostMonthGraph(type), showGraphPanel: true });
        }
        else if (type === 'post-year') {
            this.setState({ graphPanel: this.showPostYearGraph(type), showGraphPanel: true });
        }
        else if (type === 'week') {
            this.setState({ graphPanel: this.showWeekGraph(type), showGraphPanel: true });
        }
        else if (type === 'month') {
            this.setState({ graphPanel: this.showMonthGraph(type), showGraphPanel: true });
        }
        else if (type === 'year') {
            this.setState({ graphPanel: this.showYearGraph(type), showGraphPanel: true });
        }




    }

    closePanel() {
        this.setState({ graphPanel: null, showGraphPanel: false });
    }

    saveGraph(e) {

        let type = e;
        console.log(e);
        let graphsObj = {
            graphs: this.state.graphs
        };

        graphsObj.graphs.push(e);
        console.log(graphsObj);


        this.setState({ graphs: graphsObj.graphs });
        console.log(this.state.user);
        app.put('/api/graphs/' + JSON.parse(localStorage.getItem('user'))._id, graphsObj)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })

        window.location.href = '/homeExpanded/' + JSON.parse(localStorage.getItem('user'))._id;
    }


    render() {
        let addAccountClose = () => this.setState({ addAccountShow: false });
        return (
            <div style={{ display: "flex", height: "90%", backgroundColor: "rgb(255,250,240)" }}>
                <Nav defaultActiveKey="/home" sticky="left" className="flex-column" style={{ width: "100px", height: "100%", backgroundColor: "rgb(119,126,82)" }}>

                    <div>{this.state.buttons}</div>

                </Nav>
                <div style={{
                    display: "flex",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "cover",
                    backgroundAttachment: "fixed",
                    backgroundSize: "100%",
                    overflow: "auto",
                    width: "100%", height: "100%"
                }}>
                    <div style={{ width: "15%", minWidth: "150px", backgroundColor: "rgb(147, 159, 156)", height: "100%" }}>
                        <Nav style={{ width: "100%" }}>
                            <div style={{ float: "center", width: "100%" }}>
                                <p style={{
                                    textTransform: "uppercase",
                                    textShadow: "1px 1px white",
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
                                    border: "2px solid rgb(64,82,37)",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "1px 1px black"
                                }}>FRIENDS</NavLink>
                                <Collapse isOpen={this.state.friendsIsOpen}>
                                    <Card>

                                        <Button value="week" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST WEEK</Button>
                                        <Button value="month" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST MONTH</Button>
                                        <Button value="year" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST YEAR</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuPosts} style={{
                                    color: "white",
                                    border: "2px solid rgb(64,82,37)",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "1px 1px black"
                                }}>POSTS</NavLink>
                                <Collapse isOpen={this.state.postsIsOpen}>
                                    <Card>
                                        <Button value="post-day" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST DAY</Button>
                                        <Button value="post-week" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST WEEK</Button>
                                        <Button value="post-month" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST MONTH</Button>
                                        <Button value="post-year" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST YEAR</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuLikes} style={{
                                    color: "white",
                                    border: "2px solid rgb(64,82,37)",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "1px 1px black"
                                }}>LIKES</NavLink>
                                <Collapse isOpen={this.state.likesIsOpen}>
                                    <Card>
                                        <Button value="week" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST WEEK</Button>
                                        <Button value="month" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST MONTH</Button>
                                        <Button value="year" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST YEAR</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuComments} style={{
                                    color: "white",
                                    border: "2px solid rgb(64,82,37)",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "1px 1px black"
                                }}>COMMENTS</NavLink>
                                <Collapse isOpen={this.state.commentsIsOpen}>
                                    <Card>
                                        <Button value="week" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST WEEK</Button>
                                        <Button value="month" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST MONTH</Button>
                                        <Button value="year" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST YEAR</Button>
                                    </Card>
                                </Collapse>
                                <NavLink onClick={this.toggleMenuShares} style={{
                                    color: "white",
                                    border: "2px solid rgb(64,82,37)",
                                    height: "8%",
                                    fontSize: "120%",
                                    borderRadius: "5px",
                                    textShadow: "1px 1px black"
                                }}>SHARES</NavLink>
                                <Collapse isOpen={this.state.sharesIsOpen}>
                                    <Card>
                                        <Button value="week" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST WEEK</Button>
                                        <Button value="month" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST MONTH</Button>
                                        <Button value="year" onClick={(e) => this.openPanel(e)} variant="outline-dark">PAST YEAR</Button>
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
                        {this.state.displaySavedGraphs}
                    </div>
                </div>
            </div >
        )
    }
}

export default Home;