import { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reverse: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { reverse } = this.state;
    this.setState({ reverse: !reverse });
  }

  render() {
    const { reverse } = this.state;
    return (
      <>
        <img src={logo} className={reverse ? 'App-logo reverse' : 'App-logo'} alt="logo" />
        <button type="button" onClick={this.handleClick}>
          Inverter giro
        </button>
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ClassApp />
      <h1>Olá</h1>
    </div>
  );
}

export default App;
