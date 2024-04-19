import { initialState } from '.';
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
      if (state.counter === 0) return state;
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    case actionTypes.SET_COUNTER: {
      if (typeof action.payload !== 'number') return state;
      return {
        ...state,
        counter: action.payload,
      };
    }
    case actionTypes.RESET: {
      return { ...initialState };
    }
    case actionTypes.ASYNC_INCREMENT_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.ASYNC_INCREMENT_END: {
      return {
        ...state,
        loading: false,
        counter: state.counter + 1,
      };
    }
    case actionTypes.ASYNC_INCREMENT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
  }

  return state;
};
