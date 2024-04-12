import { useContext, useReducer } from 'react';
import { GlobalContext } from './Context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter > 0 ? state.counter - 1 : 0 };
    case 'toggleCaps':
      return { ...state, title: state.title === 'OLÁ MUNDO' ? 'olá mundo' : 'OLÁ MUNDO' };
  }
  return { ...state };
};

const ReducerApp = () => {
  const [state, dispatch] = useReducer(reducer, useContext(GlobalContext));
  const { counter, title, body } = state;

  console.log(state, dispatch);
  console.log(counter, title, body);

  return (
    <div className="App">
      <h2>
        {title} {counter}
      </h2>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'toggleCaps' })}>Alterna caixa alta</button>
    </div>
  );
};

export default ReducerApp;
