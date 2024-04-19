import * as actionTypes from './actions-types';
export const buildActions = (dispatch) => {
  return {
    increment: () => dispatch({ type: actionTypes.INCREMENT }),
    decrement: () => dispatch({ type: actionTypes.DECREMENT }),
    reset: () => dispatch({ type: actionTypes.RESET }),
    setCounter: (payload) => dispatch({ type: actionTypes.SET_COUNTER, payload }),
    asyncIncrementStart: () => asyncIncStart(dispatch),
    asyncIncrementError: () => asyncIncErrorExample(dispatch),
  };
};
const asyncIncStart = async (dispatch) => {
  dispatch({ type: actionTypes.ASYNC_INCREMENT_START });

  return await new Promise((resolve) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.ASYNC_INCREMENT_END });
      resolve('Resolved');
    }, 2000);
  });
};

const asyncIncErrorExample = async (dispatch) => {
  dispatch({ type: actionTypes.ASYNC_INCREMENT_START });

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.ASYNC_INCREMENT_ERROR });
      reject('Rejected');
    }, 2000);
  });
};
