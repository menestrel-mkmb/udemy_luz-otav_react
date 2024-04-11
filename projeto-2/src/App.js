import P from 'prop-types';
import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import logo from './logo.svg';
import './App.css';

const enableConsoleUseRefForm = false;

const PostForm = ({ post, onClick }) => {
  enableConsoleUseRefForm && console.log('child render');

  return (
    <section key={post.id}>
      <h3 onClick={(e) => onClick(e.target.textContent)}>{post.title}</h3>
      <p>{post.body}</p>
    </section>
  );
};

PostForm.propTypes = {
  post: P.shape({
    id: P.number.isRequired,
    title: P.string.isRequired,
    body: P.string.isRequired,
  }).isRequired,
  onClick: P.func.isRequired,
};

const RefFormApp = () => {
  const [posts, setPosts] = useState([]);
  const searchValue = useRef(null);

  enableConsoleUseRefForm && console.log('parent render');

  const handleClick = (value) => {
    searchValue.current.value = value;
    searchValue.current.focus();
  };

  useEffect(() => {
    enableConsoleUseRefForm && console.log('componentDidMount render');
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="App">
      <h2>Posts</h2>
      <input type="search" placeholder="Search for post" ref={searchValue} />
      <article>
        {useMemo(() => {
          return posts.length > 0 ? (
            posts.map((post) => <PostForm key={post.id} post={post} onClick={handleClick} />)
          ) : (
            <p>Carregando...</p>
          );
        }, [posts])}
      </article>
    </div>
  );
};

const enableConsoleUseRef = false;

const Post = ({ post }) => {
  enableConsoleUseRef && console.log('child render');

  return (
    <section key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </section>
  );
};

Post.propTypes = {
  post: P.shape({
    id: P.number.isRequired,
    title: P.string.isRequired,
    body: P.string.isRequired,
  }).isRequired,
};

const MemoFetchApp = () => {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  enableConsoleUseRef && console.log('parent render');

  useEffect(() => {
    enableConsoleUseRef && console.log('componentDidMount render');
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }, 5000);
  }, []);

  return (
    <div className="App" style={{ display: 'none' }}>
      <h2>Posts</h2>
      <input
        type="search"
        placeholder="Search for post"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <article>
        {useMemo(() => {
          return posts.length > 0 ? posts.map((post) => <Post key={post.id} post={post} />) : <p>Carregando...</p>;
        }, [posts])}
      </article>
    </div>
  );
};

const enableCallbackAppConsole = false;

const Button = React.memo(function Button({ incrementButton }) {
  enableCallbackAppConsole && console.log('child render');
  return <button onClick={() => incrementButton(10)}>+</button>;
});

Button.propTypes = {
  incrementButton: P.func.isRequired,
};

const CallbackApp = () => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = useCallback((num) => setCounter((c) => c + num), []);

  const ButtonMemo = ({ incrementButton }) => {
    enableCallbackAppConsole && console.log('child render');
    return <button onClick={() => incrementButton(10)}>+memo</button>;
  };

  ButtonMemo.propTypes = {
    incrementButton: P.func.isRequired,
  };

  enableCallbackAppConsole && console.log('parent render');

  return (
    <div className="App" style={{ display: 'none' }}>
      <h2>Counter {counter}</h2>
      <Button incrementButton={incrementCounter} />
      {useMemo(() => {
        return <ButtonMemo incrementButton={incrementCounter} />;
      }, [incrementCounter])}
    </div>
  );
};

const listenerEvent = () => {
  console.log('listenerEvent');
};

const enableUseEffectConsoleLog = false;

const LifeCycleApp = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  useEffect(() => {
    enableUseEffectConsoleLog && console.log('componentDidMount');
  }, []);

  useEffect(() => {
    enableUseEffectConsoleLog && console.log('parent componentDidUpdate');
  });

  useEffect(() => {
    enableUseEffectConsoleLog && console.log('child counter1 componentDidUpdate');
  }, [counter1]);

  useEffect(() => {
    enableUseEffectConsoleLog && console.log('child counter2 componentDidUpdate');
  }, [counter2]);

  useEffect(() => {
    document.querySelector('#doubleCounter')?.addEventListener('click', listenerEvent);
    return () => {
      enableUseEffectConsoleLog && console.log('componentWillUnmount');
      document.querySelector('#doubleCounter')?.removeEventListener('click', listenerEvent);
    };
  }, []);

  return (
    <div className="App" style={{ display: 'none' }}>
      <h2 id="doubleCounter">
        C1: {counter1} C2: {counter2}
      </h2>
      <button type="button" onClick={() => setCounter1((c) => c + 1)}>
        + C1
      </button>
      <button type="button" onClick={() => setCounter2((c) => c + 1)}>
        + C2
      </button>
      <p>123</p>
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
      <CallbackApp />
      <MemoFetchApp />
      <RefFormApp />
    </div>
  );
}

export default App;
