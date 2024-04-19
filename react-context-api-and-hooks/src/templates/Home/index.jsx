import { useCounterContext } from '../../contexts/CounterContext';

export const Home = () => {
  const [state, action] = useCounterContext();

  return (
    <div>
      <h1 onClick={() => action.increment()}>Oi</h1>
      <h1>{state.counter}</h1>
    </div>
  );
};
