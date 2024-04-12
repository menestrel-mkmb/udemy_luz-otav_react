import { useContext } from 'react';
import { GlobalContext } from '../../Context';

const Body = () => {
  const { body, setCounter } = useContext(GlobalContext);
  return (
    <p className="p" onClick={() => setCounter((c) => c + 1)}>
      {body}
    </p>
  );
};

export default Body;
