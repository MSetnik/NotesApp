import React, { useReducer } from "react";

// React navigation
import { NavigationContainer } from "@react-navigation/native";

// Routes
import StackNavigation from "./src/routes/stack-navigation";

// Reducers
import { initialState } from "./src/store/initial-state";
import { reducer, StoreContext } from "./src/store/reducer";

export default function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </StoreContext.Provider>
  );
}
