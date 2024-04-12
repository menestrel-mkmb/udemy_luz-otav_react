import { createContext, useContext } from 'react';

const GlobalContext = createContext();
const globalState = {
  title: 'Olá mundo',
  counter: 0,
};

const H1 = () => {
  const { globalState: theContext } = useContext(GlobalContext);
  return <h1 className="h1">{theContext.title}</h1>;
};

const Div = () => {
  return (
    <div className="div">
      <H1 />
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
