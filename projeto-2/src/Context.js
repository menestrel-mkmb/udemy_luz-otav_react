import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const H1 = () => {
  const { counter, title } = useContext(GlobalContext);
  return (
    <h1 className="h1">
      {title} {counter}
    </h1>
  );
};

const Body = () => {
  const { body, setCounter } = useContext(GlobalContext);
  return (
    <p className="p" onClick={() => setCounter((c) => c + 1)}>
      {body}
    </p>
  );
};

const Div = () => {
  return (
    <div className="div">
      <H1 />
      <Body />
    </div>
  );
};

const ContextApp = () => {
  return <Div />;
};

const Context = () => {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState('Olá mundo');
  const [body, setBody] = useState('Olá mundo');

  return (
    <div className="App">
      <GlobalContext.Provider value={{ counter, setCounter, title, setTitle, body, setBody }}>
        <ContextApp />
      </GlobalContext.Provider>
    </div>
  );
};

export default Context;
