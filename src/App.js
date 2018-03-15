import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Debits from './components/Debits';

// import AccountBalance from './components/AccountBalance';
import UserProfile from './components/UserProfile';
import Login from './components/Login';

class App extends Component {
  constructor() {
    super();

    this.state = {
      credits: null,
      debits: null,
      accountBalance: null,
      currentUser: {
        userName: 'Bob',
        memberSince: '10/22/88'
      }
    };

    this.mockLogin = this.mockLogin.bind(this);
    this.updateCredits = this.updateCredits.bind(this);
  }

  mockLogin = logInInfo => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    console.log(newUser);
    this.setState({ currentUser: newUser });
  };

  updateCredits = credits => {
    // console.log('credits: ', credits);
    let creditsArray = credits.map(credit => credit.amount);
    console.log(creditsArray);
    let sum = creditsArray.reduce((sum, number) => {
      return sum + number;
    });

    console.log(sum);
    this.setState({
      credits: sum,
      accountBalance: this.state.accountBalance - sum
    });
  };

  updateDebits = debits => {
    let debitsArray = debits.map(credit => credit.amount);
    console.log(debitsArray);
    let sum = debitsArray.reduce((sum, number) => {
      return sum + number;
    });

    console.log(sum);
    this.setState({
      debits: sum,
      accountBalance: this.state.accountBalance + sum
    });
  };

  render() {
    // save a reference to the Home component so that it can be used at a later time.
    // necessary to make a reference to component instead of passing actual component when you want to send state via props
    const HomeComponent = () => (
      <Home
        accountBalance={this.state.accountBalance}
        updateCredits={this.updateCredits}
        updateDebits={this.updateDebits}
      />
    );

    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );

    const LogInComponent = () => (
      <Login
        user={this.state.currentUser}
        mockLogIn={this.mockLogin}
        {...this.props}
      />
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userprofile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/debits" component={Debits} />
        </Switch>
      </Router>
    );
  }
}

export default App;
