import React, { Component } from 'react';
import Debits from './Debits';

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debitsData: null,
      creditsData: null
    };
  }

  componentDidMount() {
    this.getCredits();
    this.getDebits();
  }

  getDebits() {
    fetch('http://localhost:4000/debits')
      .then(response => {
        if (response.ok) {
          console.log('response', response);
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log('this', this);
        // console.log('data', data);
        this.props.updateDebits(data);
        this.setState({ debitsData: new Array(data) });
        console.log('data', data);
      })
      .catch(error => console.log('errrror: ', error));
  }

  getCredits() {
    fetch('http://localhost:4000/credits')
      .then(response => {
        if (response.ok) {
          console.log('response', response);
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log('this', this);
        // console.log('data', data);
        this.props.updateCredits(data);
      })
      .catch(error => console.log('errrror: ', error));
  }

  render() {
    // console.log(this.props);
    if (!this.props.accountBalance)
      return (
        <div>
          Loading Balance...
          {/* <Debits debitsData={this.state.debitsData} /> */}
        </div>
      );
    return (
      <div>
        <div>
          Balance: {this.props.accountBalance}
          <Debits debitsData={this.state.debitsData} />
        </div>
      </div>
    );
  }
}

export default AccountBalance;
