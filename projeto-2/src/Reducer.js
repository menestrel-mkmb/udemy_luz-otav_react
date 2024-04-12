import { useContext, useReducer, useRef } from 'react';
import { GlobalContext } from './Context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + action.payload };
    case 'decrement':
      return { ...state, counter: state.counter > 0 ? state.counter - 1 : 0 };
    case 'insertDate': {
      console.log(action.payload);
      return { ...state, title: action.payload };
    }
    case 'changeTitle': {
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
  const titleRef = useRef(null);

  const handleChangeTitle = () => {
    if (!titleRef.current.value) return;
    console.log('change title');
    dispatch({ type: 'changeTitle', payload: titleRef.current.value });
  };

  return (
    <div className="App">
      <h2>
        {title} {counter}
      </h2>
      <p>{body}</p>
      <input type="text" ref={titleRef} />
      <button onClick={handleChangeTitle}>Alterar título</button>
      <button onClick={() => dispatch({ type: 'increment', payload: 1 })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'insertDate', payload: new Date().toLocaleString('pt-BR') })}>
        Horário atual
      </button>
      <button onClick={() => dispatch({ type: 'invertBody' })}>Inverter texto</button>
      <button onClick={() => dispatch({ type: 'ERROR' })}>Ação inexistente</button>
    </div>
  );
};

export default ReducerApp;
