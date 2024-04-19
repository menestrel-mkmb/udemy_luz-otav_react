import { useEffect, useState } from 'react';
import { useCounterContext } from '../../contexts/CounterContext';

export const Home = () => {
  const [state, actions] = useCounterContext();

  useEffect(() => {
    actions.increment();
  }, [actions]);

  return (
    <div>
      <h1 onClick={() => actions.increment()}>Oi</h1>
      <h1>{state.counter}</h1>
    </div>
  );
};
