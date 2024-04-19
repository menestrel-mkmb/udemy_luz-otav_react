import P from 'prop-types';
import './styles.css';

export const Button = ({ children, onClick }) => {
  return (
    <button className="counter-btn" onClick={() => onClick()}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: P.node.isRequired,
  onClick: P.func.isRequired,
};
