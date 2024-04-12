import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { GlobalContext } from './Context';

const enableConsoleCustomHook = false;

const useMyHook = (cb, delay = 1000) => {
  const saveCb = useRef();

  useEffect(() => {
    saveCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveCb.current();
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [delay]);
};

const CustomHookApp = () => {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(100);

  return (
    <div>
      <h2 onClick={useMyHook(() => setCounter((c) => c + 1), delay)}>Contador: {counter}</h2>
      <p>Intervalo: {delay}</p>
      <input type="number" value={incrementor} onChange={(e) => setIncrementor(Number(e.target.value))} />
      <button onClick={() => setDelay((d) => d + incrementor)}>Incrementar intervalo</button>
      <button onClick={() => setDelay((d) => d - incrementor)}>Decrementar intervalo</button>
    </div>
  );
};

const enableConsoleReducer = false;

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + action.payload };
    case 'decrement':
      return { ...state, counter: state.counter > 0 ? state.counter - 1 : 0 };
    case 'insertDate': {
      enableConsoleReducer && console.log(action.payload);
      return { ...state, title: action.payload };
    }
    case 'changeTitle': {
      return { ...state, title: action.payload };
    }
    case 'invertBody':
      return { ...state, body: state.body.split('').reverse().join('') };
  }
  enableConsoleCustomHook && console.log('Nenhuma das ações anteriores foi executada');
  return { ...state };
};

const ReducerApp = () => {
  const [state, dispatch] = useReducer(reducer, useContext(GlobalContext));
  const { counter, title, body } = state;
  const titleRef = useRef(null);

  const handleChangeTitle = () => {
    if (!titleRef.current.value) return;
    enableConsoleReducer && console.log('change title');
    dispatch({ type: 'changeTitle', payload: titleRef.current.value });
  };

  return (
    <div className="App">
      <CustomHookApp />
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
