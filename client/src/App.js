import React, { Component } from 'react';
import TopNavBar from './components/TopNavBar.js'
import './App.css';
class App extends Component {
  state = {
    users: []
  }

  componentDidMount = () => {
    this.fetchUsers();
  };

  fetchUsers = () => {
    /* axios.get('/users')
      .then((response) => {
        const { users } = response.data;
        this.setState({ users: [...this.state.users, ...users] })
      })
      .catch(err => {
        console.log(err);
      }); */
  };


  addUser = ({ name, position, company }) => {
    this.setState({
      users: [...this.state.users, { name, position, company }]
    });
  };

  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <TopNavBar />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <p className="App-intro">{this.state.apiResponse}</p>




      </div>
    );
  }
}

export default App;