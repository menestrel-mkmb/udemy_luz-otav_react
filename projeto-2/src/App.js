import { Component, useState } from 'react';

import logo from './logo.svg';
import './App.css';

const FunctionStateApp = () => {
  const [counter, setCounter] = useState(0);

  const handleClickCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <h2>Contador: {counter}</h2>
      <button type="button" onClick={handleClickCounter}>
        +
      </button>
    </div>
  );
};

const FunctionApp = () => {
  const [reverse, setReverse] = useState(false);

  const handleClick = () => {
    setReverse(!reverse);
  };

  return (
    <div className="App" style={{ display: 'none' }}>
      <img src={logo} className={reverse ? 'App-logo reverse' : 'App-logo'} alt="logo" />
      <button type="button" onClick={handleClick}>
        Inverter giro
      </button>
    </div>
  );
};

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
      <div className="App" style={{ display: 'none' }}>
        <img src={logo} className={reverse ? 'App-logo reverse' : 'App-logo'} alt="logo" />
        <button type="button" onClick={this.handleClick}>
          Inverter giro
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ClassApp />
      <FunctionApp />
      <FunctionStateApp />
    </div>
  );
}

export default App;
