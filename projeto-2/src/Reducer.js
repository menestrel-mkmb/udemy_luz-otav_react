import { useContext, useReducer } from 'react';
import { GlobalContext } from './Context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter > 0 ? state.counter - 1 : 0 };
    case 'toggleCaps': {
      console.log(action.payload);
      return { ...state, title: action.payload };
    }
    case 'invertBody':
      return { ...state, body: state.body.split('').reverse().join('') };
  }
  console.log('Nenhuma das ações anteriores foi executada');
  return { ...state };
};

const ReducerApp = () => {
  const [state, dispatch] = useReducer(reducer, useContext(GlobalContext));
  const { counter, title, body } = state;

  return (
    <div className="App">
      <h2>
        {title} {counter}
      </h2>
      <p>{body}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'toggleCaps', payload: new Date().toLocaleString('pt-BR') })}>
        Horário atual
      </button>
      <button onClick={() => dispatch({ type: 'invertBody' })}>Inverter texto</button>
      <button onClick={() => dispatch({ type: 'ERROR' })}>Ação inexistente</button>
    </div>
  );
};

export default ReducerApp;
