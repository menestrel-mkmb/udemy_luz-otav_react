import { Component, useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

// const listenerEvent = () => {
//   console.log('listenerEvent');
// };

const disableUseEffectConsoleLog = true;

const LifeCycleApp = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useEffect(() => {
    disableUseEffectConsoleLog && console.log('componentDidMount');
  }, []);

  useEffect(() => {
    disableUseEffectConsoleLog && console.log('parent componentDidUpdate');
  });

  useEffect(() => {
    disableUseEffectConsoleLog && console.log('child counter1 componentDidUpdate');
  }, [counter1]);

  useEffect(() => {
    disableUseEffectConsoleLog && console.log('child counter2 componentDidUpdate');
  }, [counter2]);

  return (
    <div className="App">
      <h2 id="doubleCounter">
        C1: {counter1} C2: {counter2}
      </h2>
      <button type="button" onClick={() => setCounter1((c) => c + 1)}>
        + C1
      </button>
      <button type="button" onClick={() => setCounter2((c) => c + 1)}>
        + C2
      </button>
    </div>
  );
};

const FunctionStateApp = () => {
  const [counter, setCounter] = useState(0);

  const handleClickCounter = () => {
    setCounter(counter + 1);
  };

  const handleSafeClickCounter = () => {
    setCounter((c) => c + 1);
  };

  return (
    <div className="App" style={{ display: 'none' }}>
      <h2>Contador: {counter}</h2>
      <button type="button" onClick={handleClickCounter}>
        +
      </button>
      <button type="button" onClick={handleSafeClickCounter}>
        +s
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
      <LifeCycleApp />
    </div>
  );
}

export default App;
