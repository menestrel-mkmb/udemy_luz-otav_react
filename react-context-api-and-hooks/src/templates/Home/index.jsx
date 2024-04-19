import { useEffect } from 'react';
import { useCounterContext } from '../../contexts/CounterContext';
import './styles.css';
import { Button } from '../../components/Button';

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
        <Button onClick={() => actions.decrement()}>-</Button>
        <Button onClick={() => actions.reset()}>Reset</Button>
        <Button onClick={() => actions.increment()}>+</Button>
      </section>
    </div>
  );
};
