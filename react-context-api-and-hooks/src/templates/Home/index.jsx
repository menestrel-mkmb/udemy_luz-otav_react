import { useEffect } from 'react';
import { useCounterContext } from '../../contexts/CounterContext';
import './styles.css';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';

export const Home = () => {
  const [state, actions] = useCounterContext();

  useEffect(() => {
    actions.increment();
  }, [actions]);

  return (
    <div>
      <Heading />
      {state.loading && <h2>Atualizando requisição</h2>}
      <input type="number" value={state.counter} onChange={(e) => actions.setCounter(Number(e.target.value))} />
      <section>
        <Button onClick={() => actions.decrement()}>-</Button>
        <Button onClick={() => actions.reset()}>Reset</Button>
        <Button onClick={() => actions.increment()}>+</Button>
      </section>
      <section>
        <Button onClick={() => actions.asyncIncrementStart()}>+async</Button>
        <Button onClick={() => actions.asyncIncrementError()}>Rasync</Button>
      </section>
    </div>
  );
};
