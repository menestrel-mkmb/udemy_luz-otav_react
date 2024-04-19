import * as actionTypes from './actions-types';
export const buildActions = (dispatch) => {
  return {
    increment: () => dispatch({ type: actionTypes.INCREMENT }),
    decrement: () => dispatch({ type: actionTypes.DECREMENT }),
    reset: () => dispatch({ type: actionTypes.RESET }),
    setCounter: (payload) => dispatch({ type: actionTypes.SET_COUNTER, payload }),
    asyncIncrementStart: () => dispatch({ type: actionTypes.ASYNC_INCREMENT_START }),
    asyncIncrementEnd: () => dispatch({ type: actionTypes.ASYNC_INCREMENT_END }),
    asyncIncrementError: () => dispatch({ type: actionTypes.ASYNC_INCREMENT_ERROR }),
  };
};
