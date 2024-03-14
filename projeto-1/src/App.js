import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.handlePClick = this.handlePClick.bind(this);

    this.state = {
      name: 'Michael',
      counter: 0
    }
  }

  handlePClick() {
    this.setState({
      name: 'Nome alterado no state pelo event'
    });
  }

  handleAClick = (e) => {
    e.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter+1 });
  }
  render() {
    const { name } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            Olá mundo {this.state.counter}!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.handleAClick}
          >
            {name}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
