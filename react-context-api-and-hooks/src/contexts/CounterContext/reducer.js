import { initialState } from './index';
import * as actionTypes from './actions-types';

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case actionTypes.DECREMENT: {
      if (state.counter === 0) return;
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    case actionTypes.SET_COUNTER: {
      if (typeof action.payload !== 'number') return;
      return {
        ...state,
        counter: action.payload,
      };
    }
    case actionTypes.RESET: {
      return { ...initialState };
    }
  }
  return state;
};
