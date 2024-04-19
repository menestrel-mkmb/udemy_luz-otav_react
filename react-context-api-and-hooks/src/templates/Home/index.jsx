import { useEffect } from 'react';
import { useCounterContext } from '../../contexts/CounterContext';
import './styles.css';

export const Home = () => {
  const [state, actions] = useCounterContext();

  useEffect(() => {
    actions.increment();
  }, [actions]);

  return (
    <div>
      <h2>{state.counter}</h2>
      <input type="number" value={state.counter} onChange={(e) => actions.setCounter(Number(e.target.value))} />
      <section>
        <button className="counter-btn" onClick={() => actions.decrement()}>
          -
        </button>
        <button className="counter-btn" onClick={() => actions.reset()}>
          Reset
        </button>
        <button className="counter-btn" onClick={() => actions.increment()}>
          +
        </button>
      </section>
    </div>
  );
};
