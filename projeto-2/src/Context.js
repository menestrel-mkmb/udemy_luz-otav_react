import { createContext, useState } from 'react';
import ReducerApp from './Reducer';

import Div from './components/Div';

export const GlobalContext = createContext();

const Context = () => {
  return <Div />;
};

const ContextApp = () => {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState('Olá mundo');
  const [body, setBody] = useState('Lorem123');

  const [context, setContext] = useState({ counter, title, body });

  const changeContext = (counter, title, body) => {
    if (counter) setCounter(counter);
    if (title) setTitle(title);
    if (body) setBody(body);

    setContext({ counter, title, body });
  };

  return (
    <div className="App">
      <GlobalContext.Provider value={{ counter, setCounter, title, setTitle, body, setBody, context, changeContext }}>
        <Context />
        <ReducerApp />
      </GlobalContext.Provider>
    </div>
  );
};

export default ContextApp;
