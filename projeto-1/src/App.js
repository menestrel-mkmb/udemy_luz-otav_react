import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.handlePClick = this.handlePClick.bind(this);

    this.state = {
      name: 'Michael'
    }
  }

  handlePClick() {
    this.setState({
      name: 'Nome alterado no state pelo event'
    });
  }
  render() {
    const { name } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            Olá mundo
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
