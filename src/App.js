import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class LambdaDemo extends Component {
  state = {
    loading: false,
    response: '',
    input: '',
    timeelapsed: ''
  };

  handleClick = e => {
    e.preventDefault();
    if (this.state.input.length < 42) {
      this.setState({ loading: false, response: 'Address invalid' });
      return;
    }
    this.setState({ loading: true, response: '' });
    const now = Date.now();
    axios.get(`/.netlify/functions/hello/${this.state.input}`).then(({ data }) => {
      console.log(data);
      this.setState({
        loading: false,
        response: `Balance: ${data} ETH`,
        timeelapsed: Date.now() - now
      });
    });
  };

  render() {
    const { loading, response } = this.state;

    return (
      <div>
        <p>Type your address</p>
        <input
          style={{
            border: '1px solid lightgrey',
            width: '300px',
            padding: '8px',
            'border-radius': '8px'
          }}
          value={this.state.input}
          onChange={({ target }) => this.setState({ input: target.value })}
        />
        <br />
        <button
          style={{
            background: 'grey',
            color: 'white',
            margin: '12px',
            padding: '8px',
            'border-radius': '8px'
          }}
          onClick={this.handleClick}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <br />

        <p>{response}</p>
        <br />
        {/* <p>{`${this.state.timeelapsed ? this.state.timeelapsed} ms`}</p> */}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ETH Balance</h1>
        </header>
        <LambdaDemo />
      </div>
    );
  }
}

export default App;
