import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <img
          src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png"
          alt="bank"
        />
        <h1>Bank of React</h1>
        <AccountBalance {...this.props} />
        <Link to="/userProfile">User Profile</Link>
      </div>
    );
  }
}

export default Home;
