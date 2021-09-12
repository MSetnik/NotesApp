import { createContext } from "react";

import { actions } from "./actions";

import { initialState } from "./initial-state";

export const StoreContext = createContext(null);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.START_LOADER:
      return {
        ...state,
        isLoading: true
      };

    case actions.ADD_NOTE:
      return {
        ...state,
        notes: action.payload
      };

    default:
      return state;
  }
};