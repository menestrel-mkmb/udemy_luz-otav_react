import { createContext, useState } from 'react';

import Div from './components/Div';

export const GlobalContext = createContext();

const Context = () => {
  return <Div />;
};

const ContextApp = () => {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState('Olá mundo');
  const [body, setBody] = useState('Lorem123');

  return (
    <div className="App">
      <GlobalContext.Provider value={{ counter, setCounter, title, setTitle, body, setBody }}>
        <Context />
      </GlobalContext.Provider>
    </div>
  );
};

export default ContextApp;
