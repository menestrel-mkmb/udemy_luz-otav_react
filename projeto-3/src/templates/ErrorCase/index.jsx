import { useEffect, useState } from 'react';
import CounterErrorBoundary from '../../components/CounterErrorBoundary';

const s = {
  style: {
    fontSize: '60px',
  },
};

const ItWillThrowError = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter > 3) {
      throw new Error('Que chato!!!');
    }
  }, [counter]);

  return (
    <div>
      <button {...s} onClick={() => setCounter((s) => s + 1)}>
        Click to increase {counter}
      </button>
    </div>
  );
};

export const ErrorCase = () => {
  return (
    <div {...s}>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
      <CounterErrorBoundary>
        <ItWillThrowError />
      </CounterErrorBoundary>
    </div>
  );
};

export default ErrorCase;
