import { createContext, useContext } from 'react';

const GlobalContext = createContext();
const globalState = {
  title: 'Olá mundo',
  counter: 0,
  body: 'Lorem123',
};

const H1 = () => {
  const { globalState } = useContext(GlobalContext);
  return <h1 className="h1">{globalState.title}</h1>;
};

const Div = () => {
  const { globalState } = useContext(GlobalContext);

  return (
    <div className="div">
      <H1 />
      <p className="p">{globalState.body}</p>
    </div>
  );
};

const ContextApp = () => {
  return <Div />;
};

const Context = () => {
  return (
    <div className="App">
      <GlobalContext.Provider value={{ globalState }}>
        <ContextApp />
      </GlobalContext.Provider>
    </div>
  );
};

export default Context;
