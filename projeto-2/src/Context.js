import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();
const globalState = {
  title: 'Olá mundo',
  counter: 0,
  body: 'Lorem123',
};

const H1 = () => {
  const {
    contextState: {
      globalState: { title },
    },
  } = useContext(GlobalContext);
  return <h1 className="h1">{title}</h1>;
};

const Div = () => {
  const {
    contextState: {
      globalState: { body },
    },
  } = useContext(GlobalContext);

  return (
    <div className="div">
      <H1 />
      <p className="p">{body}</p>
    </div>
  );
};

const ContextApp = () => {
  return <Div />;
};

const Context = () => {
  const [contextState, setContextState] = useState({ globalState });
  return (
    <div className="App">
      <GlobalContext.Provider value={{ contextState, setContextState }}>
        <ContextApp />
      </GlobalContext.Provider>
    </div>
  );
};

export default Context;
