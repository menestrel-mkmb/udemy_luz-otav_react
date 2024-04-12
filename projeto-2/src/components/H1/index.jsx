import { useContext } from 'react';
import { GlobalContext } from '../../Context';
const H1 = () => {
  const { counter, title } = useContext(GlobalContext);
  return (
    <h1 className="h1">
      {title} {counter}
    </h1>
  );
};

export default H1;
